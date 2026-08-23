import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthContainer from './components/Auth/AuthContainer';
import BoardView from './components/Board/BoardView';
import './index.css';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? <BoardView /> : <AuthContainer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
