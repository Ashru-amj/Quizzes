// utils/Auth.js

export function isAuthenticated() {
    const userToken = localStorage.getItem("userToken");
    return !!userToken;
  }