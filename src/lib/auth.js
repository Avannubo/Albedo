// auth.js - Create a separate file for authentication-related functions

export const isAuthenticated = () => {
    // Check if the token exists and is valid
    const token = localStorage.getItem('token'); // Get the token from local storage

    // Implement your logic to validate the token
    return !!token; // Return true if the token exists and is valid, false otherwise
};


