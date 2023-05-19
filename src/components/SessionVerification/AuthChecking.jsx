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

    return loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <div className="loader"></div>
      </div>
    ) : (
      <Component {...props} />
    )
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

    return loading ? (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
          }}
        >
          <h1 style={{ fontSize: '80px' }}>404 Error</h1>
          <h3 class="h2">Look like you're lost</h3>
          <button
            style={{
              marginTop: '10px',
              color: 'white',
              borderRadius: '8px',
              backgroundColor: 'var(--med-orange)',
              border: '2px solid var(--med-orange)'
            }}
            onClick={() => {
              window.location.replace('/')
            }}
          >
            Click Me
          </button>
        </div>
      </div>
    ) : (
      <Component {...props} />
    )
  }

  return UnauthRoute
}

export { withAuth, withoutAuth }
