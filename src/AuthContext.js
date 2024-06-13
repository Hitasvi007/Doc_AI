import React, { createContext, useContext, useState } from 'react';

// Create an authentication context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // Function to update credentials
  const updateCredentials = (username, password) => {
    setCredentials({ username, password });
  };

  return (
    <AuthContext.Provider value={{ credentials, updateCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
