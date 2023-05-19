import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const withAuth = (
  Component,
  options = { redirectAuthenticated: true, redirectTo: '/' }
) => {
  const AuthRoute = props => {
    const navigate = useNavigate()
    const { userData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (options.redirectAuthenticated && userData) {
        navigate(options.redirectTo, { replace: true })
      }
      setLoading(false)
    }, [userData, navigate, options.redirectAuthenticated, options.redirectTo])

    return loading ? null : <Component {...props} />
  }

  return AuthRoute
}

const withoutAuth = (
  Component,
  options = { redirectUnauthenticated: false }
) => {
  const UnauthRoute = props => {
    const navigate = useNavigate()
    const { userData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (userData === null) {
        options.redirectUnauthenticated = true
      } else {
        setLoading(false)
      }
    }, [userData, options.redirectUnauthenticated])

    useEffect(() => {
      if (!loading && options.redirectUnauthenticated && !userData) {
        navigate('/', { replace: true })
      }
    }, [userData, navigate, options.redirectUnauthenticated, loading])

    return loading ? <button></button> : <Component {...props} />
  }

  return UnauthRoute
}

export { withAuth, withoutAuth }
