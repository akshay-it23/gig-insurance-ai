import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import Card from '../components/Card'
import Button from '../components/Button'
import { Input, Select, Textarea } from '../components/Input'
import Alert from '../components/Alert'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import { LoadingSpinner, Skeleton } from '../components/LoadingSpinner'
import { formatDate, formatCurrency } from '../utils/formatters'
import { CLAIM_STATUS } from '../utils/constants'
import claimService from '../services/claimService'
import { Edit2, Trash2, Upload, Plus } from 'lucide-react'

const Claims = () => {
  const { claims, updateClaims, addClaim, updateClaim, setLoading, loading } = useUser()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const [formData, setFormData] = useState({
    policyId: '',
    description: '',
    amount: '',
    type: ''
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    setLoading(true)
    try {
      const response = await claimService.getAllClaims()
      updateClaims(response?.data || [])
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to load claims')
    } finally {
      setLoading(false)
    }
  }

  const filteredClaims = claims?.filter((claim) => {
    if (filterStatus === 'all') return true
    return claim.status === filterStatus
  }) || []

  const validateForm = () => {
    const newErrors = {}
    if (!formData.policyId) newErrors.policyId = 'Policy is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.amount) newErrors.amount = 'Amount is required'
    if (!formData.type) newErrors.type = 'Claim type is required'

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')
    console.log(error)

    try {
      if (editingId) {
        const response = await claimService.updateClaim(editingId, formData)
        updateClaim(editingId, response?.data || formData)
        setSuccess('Claim updated successfully!')
      } else {
        const response = await claimService.createClaim(formData)
        addClaim(response?.data || formData)
        setSuccess('Claim filed successfully!')
      }

      resetForm()
      setTimeout(() => setShowModal(false), 1000)
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to save claim')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (claim) => {
    setEditingId(claim.id)
    setFormData({
      policyId: claim.policyId,
      description: claim.description,
      amount: claim.amount,
      type: claim.type
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      try {
        await claimService.deleteClaim(id)
        setSuccess('Claim deleted successfully!')
        fetchClaims()
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Failed to delete claim')
      }
    }
  }

  const resetForm = () => {
    setFormData({ policyId: '', description: '', amount: '', type: '' })
    setFormErrors({})
    setEditingId(null)
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  const getStatusBadgeVariant = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return 'success'
      case 'REJECTED':
        return 'danger'
      case 'PENDING':
      case 'UNDER_REVIEW':
        return 'warning'
      default:
        return 'primary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Claims</h1>
          <p className="text-gray-600 mt-1">File and track your insurance claims</p>
        </div>
        <Button size="lg" onClick={() => {
          resetForm()
          setShowModal(true)
        }}>
          <Plus size={20} className="mr-2" />
          File Claim
        </Button>
      </div>

      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Claims</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Claims List */}
      {loading ? (
        <div className="space-y-3">
          <Skeleton height="h-24" />
          <Skeleton height="h-24" />
          <Skeleton height="h-24" />
        </div>
      ) : filteredClaims.length > 0 ? (
        <div className="grid gap-4">
          {filteredClaims.map((claim) => (
            <Card key={claim.id} className="hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Claim #{claim.id?.slice(0, 8)}</h3>
                    <Badge variant={getStatusBadgeVariant(claim.status)} size="sm">
                      {claim.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{claim.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Claim Amount</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(claim.amount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{claim.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Filed Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(claim.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Updated</p>
                      <p className="font-semibold text-gray-900">{formatDate(claim.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {claim.status !== 'submitted' && (
                    <button
                      onClick={() => handleEdit(claim)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(claim.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4 text-lg">No claims found</p>
          <Button onClick={() => {
            resetForm()
            setShowModal(true)
          }}>
            File your first claim
          </Button>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingId ? 'Edit Claim' : 'File New Claim'}
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update' : 'File Claim'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Select Policy"
            value={formData.policyId}
            onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
            error={formErrors.policyId}
            options={[
              { label: 'Policy 1', value: '1' },
              { label: 'Policy 2', value: '2' }
            ]}
            required
          />

          <Select
            label="Claim Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            error={formErrors.type}
            options={[
              { label: 'Accident', value: 'accident' },
              { label: 'Injury', value: 'injury' },
              { label: 'Property Damage', value: 'property_damage' },
              { label: 'Loss of Income', value: 'loss_of_income' }
            ]}
            required
          />

          <Input
            label="Claim Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            error={formErrors.amount}
            placeholder="e.g., 5000"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={formErrors.description}
            placeholder="Please describe what happened..."
            rows={4}
            required
          />
        </form>
      </Modal>
    </div>
  )
}

export default Claims
