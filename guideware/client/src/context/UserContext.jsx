import { createContext, useContext, useState, useCallback } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null)
  const [policies, setPolicies] = useState([])
  const [claims, setClaims] = useState([])
  const [riskAssessment, setRiskAssessment] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateUserProfile = useCallback((profile) => {
    setUserProfile(profile)
  }, [])

  const updatePolicies = useCallback((newPolicies) => {
    setPolicies(newPolicies)
  }, [])

  const addPolicy = useCallback((policy) => {
    setPolicies((prev) => [...prev, policy])
  }, [])

  const updatePolicy = useCallback((id, updatedPolicy) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? updatedPolicy : p))
    )
  }, [])

  const removePolicy = useCallback((id) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updateClaims = useCallback((newClaims) => {
    setClaims(newClaims)
  }, [])

  const addClaim = useCallback((claim) => {
    setClaims((prev) => [...prev, claim])
  }, [])

  const updateClaim = useCallback((id, updatedClaim) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? updatedClaim : c))
    )
  }, [])

  const setRiskData = useCallback((data) => {
    setRiskAssessment(data)
  }, [])

  const value = {
    userProfile,
    policies,
    claims,
    riskAssessment,
    loading,
    setLoading,
    updateUserProfile,
    updatePolicies,
    addPolicy,
    updatePolicy,
    removePolicy,
    updateClaims,
    addClaim,
    updateClaim,
    setRiskData
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
