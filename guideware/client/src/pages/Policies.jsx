import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import Card from '../components/Card'
import Button from '../components/Button'
import { Input, Select, Textarea } from '../components/Input'
import Alert from '../components/Alert'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import { LoadingSpinner, Skeleton } from '../components/LoadingSpinner'
import { formatDate, formatCurrency, daysRemaining, getStatusColor } from '../utils/formatters'
import { POLICY_STATUS } from '../utils/constants'
import policyService from '../services/policyService'
import { Edit2, Trash2, Download, Plus } from 'lucide-react'

const Policies = () => {
  const { policies, updatePolicies, addPolicy, updatePolicy, removePolicy, setLoading, loading } = useUser()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    coverage: '',
    premium: '',
    description: ''
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchPolicies()
  }, [])

  const fetchPolicies = async () => {
    setLoading(true)
    try {
      const response = await policyService.getAllPolicies()
      updatePolicies(response?.data || [])
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to load policies')
    } finally {
      setLoading(false)
    }
  }

  const filteredPolicies = policies?.filter((policy) => {
    if (filterStatus === 'all') return true
    return policy.status === filterStatus
  }) || []

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Policy name is required'
    if (!formData.type) newErrors.type = 'Policy type is required'
    if (!formData.coverage) newErrors.coverage = 'Coverage amount is required'
    if (!formData.premium) newErrors.premium = 'Premium is required'

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      if (editingId) {
        const response = await policyService.updatePolicy(editingId, formData)
        updatePolicy(editingId, response?.data || formData)
        setSuccess('Policy updated successfully!')
      } else {
        const response = await policyService.createPolicy(formData)
        addPolicy(response?.data || formData)
        setSuccess('Policy created successfully!')
      }

      resetForm()
      setTimeout(() => setShowModal(false), 1000)
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to save policy')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (policy) => {
    setEditingId(policy.id)
    setFormData({
      name: policy.name,
      type: policy.type,
      coverage: policy.coverage,
      premium: policy.premium,
      description: policy.description
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      try {
        await policyService.deletePolicy(id)
        removePolicy(id)
        setSuccess('Policy deleted successfully!')
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Failed to delete policy')
      }
    }
  }

  const handleDownload = async (id) => {
    try {
      const response = await policyService.downloadPolicyDocument(id)
      const url = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `policy-${id}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentElement.removeChild(link)
    } catch (err) {
      setError('Failed to download policy document')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', type: '', coverage: '', premium: '', description: '' })
    setFormErrors({})
    setEditingId(null)
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
          <p className="text-gray-600 mt-1">Manage your insurance policies</p>
        </div>
        <Button size="lg" onClick={() => {
          resetForm()
          setShowModal(true)
        }}>
          <Plus size={20} className="mr-2" />
          New Policy
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
              <option value="all">All Policies</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Policies List */}
      {loading ? (
        <div className="space-y-3">
          <Skeleton height="h-20" />
          <Skeleton height="h-20" />
          <Skeleton height="h-20" />
        </div>
      ) : filteredPolicies.length > 0 ? (
        <div className="grid gap-4">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                    <Badge variant={policy.status === 'active' ? 'success' : 'warning'} size="sm">
                      {policy.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{policy.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold text-gray-900">{policy.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coverage</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(policy.coverage)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Premium</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(policy.premium)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expires</p>
                      <p className="font-semibold text-gray-900">{formatDate(policy.expiryDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(policy)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDownload(policy.id)}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(policy.id)}
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
          <p className="text-gray-600 mb-4 text-lg">No policies found</p>
          <Button onClick={() => {
            resetForm()
            setShowModal(true)
          }}>
            Create your first policy
          </Button>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingId ? 'Edit Policy' : 'New Policy'}
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Policy Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            placeholder="e.g., Basic Coverage"
            required
          />

          <Select
            label="Policy Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            error={formErrors.type}
            options={[
              { label: 'Accident', value: 'accident' },
              { label: 'Liability', value: 'liability' },
              { label: 'Medical', value: 'medical' }
            ]}
            required
          />

          <Input
            label="Coverage Amount"
            type="number"
            value={formData.coverage}
            onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
            error={formErrors.coverage}
            placeholder="e.g., 50000"
            required
          />

          <Input
            label="Premium"
            type="number"
            value={formData.premium}
            onChange={(e) => setFormData({ ...formData, premium: e.target.value })}
            error={formErrors.premium}
            placeholder="e.g., 500"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Policy description..."
            rows={3}
          />
        </form>
      </Modal>
    </div>
  )
}

export default Policies
