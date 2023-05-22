// Firebase
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";

// React
import { useEffect, useState } from "react";

// import initializeAuthentication from "../Firebase/firebase.init";

// Initialize the authentication
// initializeAuthentication();

const useFirebase = () => {
 
  // States
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const auth = "";
  // getAuth();
  // const googleProvider = new GoogleAuthProvider();

  // Sign Up
  const registerUser = (email, password, navigate) => {
    // setIsLoading(true); //It will holds the loading state
    
    // Registering the user
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCreadential) => {
    //     // setting auth error default false
    //     setAuthError("");

    //     // setup new user
    //     const newUser = { email };
    //     setUser(newUser);
    //     navigate("/account-setup"); //navigate to account setup route
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     setAuthError(err.message);
    //   })
    //   .finally(() => setIsLoading(false));
  };

  // Sign In
  const logInUser = (email, password, location, navigate) => {
    // it will hold the loading state
    // setIsLoading(true);
    // setShowPin(false);
    // Signing In the user
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCreadential) => {
    //     const prevDestination = location?.state?.from || "/";
    //     navigate(prevDestination); //It will navigate to homepage or the destination that the user came from
    //     setAuthError("");
    //     const showPinModal = setTimeout(() => {
    //       setShowPin(true);
    //     }, 5000);

    //     return () => clearInterval(showPinModal);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     setAuthError(err.message);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   }); //
  };

  // Using these will hold the user even if the page is reloaded or refreshed
  useEffect(() => {
    // const unsubscribed = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUser(user);
    //   } else {
    //     setUser({});
    //   }
    //   setIsLoading(false);
    // });
    // return () => unsubscribed;
  }, [auth]);

  // SignOut
  const logOut = () => {
    // setIsLoading(true);
    // signOut(auth)
    //   .then(() => setUser({}))
    //   .catch((err) => console.log(err.message));
  };

  return {
    user,
    authError,
    isLoading,
    registerUser,
    logInUser,
    logOut,
    showPin,
    setShowPin,
  };
};

export default useFirebase;
