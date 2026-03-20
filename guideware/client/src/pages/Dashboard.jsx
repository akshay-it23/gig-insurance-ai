import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import { LoadingSpinner, Skeleton } from '../components/LoadingSpinner'
import { formatDate, formatCurrency, daysRemaining, getStatusColor } from '../utils/formatters'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Badge from '../components/Badge'
import { Link } from 'react-router-dom'
import policyService from '../services/policyService'
import claimService from '../services/claimService'
import riskService from '../services/riskService'

const Dashboard = () => {
  const { user } = useAuth()
  const { userProfile, policies, claims, riskAssessment, updatePolicies, updateClaims, setRiskData, setLoading, loading } = useUser()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch policies
        const policiesRes = await policyService.getAllPolicies()
        updatePolicies(policiesRes?.data || [])

        // Fetch claims
        const claimsRes = await claimService.getAllClaims()
        updateClaims(claimsRes?.data || [])

        // Fetch risk assessment
        try {
          const riskRes = await riskService.getRiskAssessment(user?.id)
          setRiskData(riskRes?.data || null)
        } catch {
          // Risk assessment might not be available yet
        }
      } catch (err) {
        setError(typeof err === 'string' ? err : err?.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchDashboardData()
    }
  }, [user?.id])

  const activePolicies = policies?.filter(p => p.status === 'active') || []
  const pendingClaims = claims?.filter(c => c.status === 'pending' || c.status === 'under_review') || []
  const totalInsuredValue = policies?.reduce((sum, p) => sum + (p.coverage || 0), 0) || 0

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Here's your insurance overview at a glance</p>
      </div>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Policies */}
        <Card className="border-l-4 border-l-green-500">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-medium">Active Policies</p>
            {loading ? (
              <Skeleton height="h-8" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{activePolicies.length}</p>
            )}
            <p className="text-green-600 text-xs">All active</p>
          </div>
        </Card>

        {/* Total Coverage */}
        <Card className="border-l-4 border-l-blue-500">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-medium">Total Coverage</p>
            {loading ? (
              <Skeleton height="h-8" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalInsuredValue)}</p>
            )}
            <p className="text-blue-600 text-xs">Across all policies</p>
          </div>
        </Card>

        {/* Pending Claims */}
        <Card className="border-l-4 border-l-yellow-500">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-medium">Pending Claims</p>
            {loading ? (
              <Skeleton height="h-8" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{pendingClaims.length}</p>
            )}
            <p className="text-yellow-600 text-xs">Awaiting review</p>
          </div>
        </Card>

        {/* Risk Score */}
        <Card className="border-l-4 border-l-red-500">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-medium">Risk Score</p>
            {loading ? (
              <Skeleton height="h-8" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">
                {riskAssessment?.riskScore || 'N/A'}
              </p>
            )}
            <p className={`text-xs ${
              riskAssessment?.riskCategory === 'HIGH' ? 'text-red-600' :
              riskAssessment?.riskCategory === 'MEDIUM' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {riskAssessment?.riskCategory || 'Unknown'}
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Policies */}
        <Card title="Recent Policies" subtitle={`You have ${activePolicies.length} active policies`}>
          {loading ? (
            <div className="space-y-3">
              <Skeleton height="h-12" />
              <Skeleton height="h-12" />
              <Skeleton height="h-12" />
            </div>
          ) : activePolicies.length > 0 ? (
            <div className="space-y-3">
              {activePolicies.slice(0, 3).map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{policy.name}</p>
                    <p className="text-sm text-gray-600">
                      Expires in {daysRemaining(policy.expiryDate)} days
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" size="sm">
                      Active
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No active policies yet</p>
              <Link to="/policies">
                <Button variant="primary" size="sm">Get a Policy</Button>
              </Link>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link to="/policies" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all policies →
            </Link>
          </div>
        </Card>

        {/* Recent Claims */}
        <Card title="Recent Claims" subtitle={`You have ${claims.length} total claims`}>
          {loading ? (
            <div className="space-y-3">
              <Skeleton height="h-12" />
              <Skeleton height="h-12" />
              <Skeleton height="h-12" />
            </div>
          ) : claims.length > 0 ? (
            <div className="space-y-3">
              {claims.slice(0, 3).map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">#{claim.id?.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">{formatDate(claim.createdAt)}</p>
                  </div>
                  <div>
                    <Badge variant={claim.status === 'APPROVED' ? 'success' : claim.status === 'REJECTED' ? 'danger' : 'warning'} size="sm">
                      {claim.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No claims filed yet</p>
              <Link to="/claims">
                <Button variant="primary" size="sm">File a Claim</Button>
              </Link>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link to="/claims" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all claims →
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/policies">
            <Button variant="outline" className="w-full">
              Browse Policies
            </Button>
          </Link>
          <Link to="/policies/new">
            <Button variant="primary" className="w-full">
              Get a Policy
            </Button>
          </Link>
          <Link to="/claims">
            <Button variant="outline" className="w-full">
              View Claims
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="secondary" className="w-full">
              Profile
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
