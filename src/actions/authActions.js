// import { useDispatch } from 'react-redux';

// Define the login action creator function
export const login = (username, password) => {
  const dispatch = useDispatch(); // Move inside the function component

  return async () => {
    try {
      // Perform authentication logic here
      // For example, make an API call to authenticate the user
      const response = await fetch('your-authentication-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      // Assuming the response contains authentication details
      const data = await response.json();

      // Dispatch an action to update the Redux store with authentication details
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });

      // Optionally, you can return the authentication data
      return data;
    } catch (error) {
      // Handle authentication error
      console.error('Login failed:', error);
      
      // Dispatch an action to indicate login failure
      dispatch({ type: 'LOGIN_FAILURE', payload: error });

      // Optionally, you can rethrow the error
      throw error;
    }
  };
};
