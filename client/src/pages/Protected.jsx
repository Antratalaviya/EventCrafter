import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log(authStatus);
    if (authentication && authStatus !== authentication) {
      navigate('/sign-in');
    } else if (!authentication && authStatus !== authentication) {
      navigate('/');
    }

  }, [authentication, navigate, authStatus])

  return (
    { children }
  )
}

export default Protected
