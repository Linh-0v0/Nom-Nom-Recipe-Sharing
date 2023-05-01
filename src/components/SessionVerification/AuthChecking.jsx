import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const withAuth = (Component, options = { redirectAuthenticated: true, redirectTo: '/allRecipe' }) => {
  const AuthRoute = (props) => {
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (options.redirectAuthenticated && userData) {
        navigate(options.redirectTo, { replace: true });
      }
      setLoading(false);
    }, [userData, navigate, options.redirectAuthenticated, options.redirectTo]);

    return loading ? null : <Component {...props} />;
  };

  return AuthRoute;
};

const withoutAuth = (Component, options = { redirectUnauthenticated: true }) => {
  const UnauthRoute = (props) => {
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (options.redirectUnauthenticated && !userData) {
        navigate('/login', { replace: true });
      }
      setLoading(false);
    }, [userData, navigate, options.redirectUnauthenticated]);

    return loading ? null : <Component {...props} />;
  };

  return UnauthRoute;
};

export { withAuth, withoutAuth };
