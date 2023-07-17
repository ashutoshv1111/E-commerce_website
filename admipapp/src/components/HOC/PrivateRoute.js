
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      // If token is not present, redirect to signin page
      navigate('/signin');
    }
  }, [navigate]);

  const isLoggedIn = !!window.localStorage.getItem('token');

  return isLoggedIn ? children : null;
};

export default Protected;


