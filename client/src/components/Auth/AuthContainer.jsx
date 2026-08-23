import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? (
    <Login onToggle={toggleAuth} />
  ) : (
    <Register onToggle={toggleAuth} />
  );
};

export default AuthContainer;
