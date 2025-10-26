import { useState, useCallback, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { showSessionExpiredToast } from "../utils/toast";

const useTokenExpirationMonitor = (token, onTokenExpired) => {
  const [isExpired, setIsExpired] = useState(false);

  const checkTokenExpiration = useCallback(() => {
    if (!token) {
      setIsExpired(true);
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // convert to seconds

      if (decodedToken.exp < currentTime) {
        setIsExpired(true);
        showSessionExpiredToast();
        onTokenExpired && onTokenExpired(); // Call the provided callback
      } else {
        setIsExpired(false);
      }
    } catch (error) {
      console.log("Error decoding token", error);
      setIsExpired(true);
      showSessionExpiredToast();
      onTokenExpired && onTokenExpired();
    }
  }, [token, onTokenExpired]);

  useEffect(() => {
    checkTokenExpiration();  

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60 * 1000); // check every minute

    return () => clearInterval(interval); 
  }, [checkTokenExpiration]); 

  return isExpired;
};

export default useTokenExpirationMonitor;