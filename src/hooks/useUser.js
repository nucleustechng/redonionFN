// React
import { useEffect, useState } from "react";

import axios from "../api/axios";

const REGISTER_URL = "/auth/sign-up";
const VERIFY_EMAIL_URL = "/auth/verify-email/";
const LOGIN_URL = "/auth/sign-in/";
const FORGOT_URL = "/auth/init-password-reset/";
const CHANGE_PASSWORD_URL = "/auth/complete-password-reset/";

const useUser = () => {

  // States
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const [sucessUser, setSuccessUser] = useState(false);

 
  
  const authHeader = {

    headers:{ "Content-Type": "application/json" }
  };

  // Sign Up
  const registerUser = (fname, mname, lname, email, countryID, phoneNumber, password, navigate) => {
    setIsLoading(true); //It will holds the loading state

    // Registering the user
    axios.post(
      REGISTER_URL,
      JSON.stringify({
        "firstName": fname,
        "lastName": lname,
        "otherNames": mname,
        "countryId": parseInt(countryID),
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password
      }),
      authHeader
    ).then((res) => {

      const user = res.data.data.user;

      const token = res.data.data.accessToken;

      setAuthError("success");
      const newUser = { token, user };
      console.log(newUser);
      setUser(newUser);

      navigate("/registration/verify-email");

    }).catch((err) => {
      console.log(err.response.data);
      // err.response.data ? err.response.data.message[0] : 
      setAuthError(err.response.data.msg);

    })
      .finally(() => setIsLoading(false));
  };

  // Verify Email
  const verifyEmail = (token, navigate) => {
    setIsLoading(true); //It will holds the loading state

    // Email verification
    axios.get(
      VERIFY_EMAIL_URL + token,
      authHeader
    ).then((res) => {



      setAuthError("");
      const user = res.data.data.user;

      const token = res.data.data.accessToken;

      const newUser = { token, user };
      setUser(newUser);

      localStorage.setItem("user", JSON.stringify(newUser));

      if (!user.emailVerified) {
        navigate("/registration/verify-email");
      } else if (user.identityDocument === "") {
        navigate("/account-setup");
      } else {
        navigate("/dashboard/exchange");
      }

    }).catch((err) => {
      console.log(err.response.data);
      setAuthError(err.response.data.msg);

    })
      .finally(() => setIsLoading(false));
  };


  // Sign In
  const logInUser = (email, password, location, navigate) => {
    // it will hold the loading state
    setIsLoading(true);
    // Signing In the user
    axios.post(
      LOGIN_URL,
      JSON.stringify({
        "email": email,
        "password": password
      }),
      authHeader
    ).then((res) => {
      // const prevDestination = location?.state?.from || "/";
      // navigate(prevDestination); //It will navigate to homepage or the destination that the user came from
      setAuthError("");
      // const showPinModal = setTimeout(() => {
      //   setShowPin(true);
      // }, 5000);

      // return () => clearInterval(showPinModal);
      const user = res.data.data.user;

      const token = res.data.data.accessToken;

     

      getAdditionalUser(user, token, navigate);


     




    })
      .catch((err) => {
        console.log(err.response.data);
        setAuthError(err.response.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // forgot password
  const forgotPass = (email, navigate) => {
    setIsLoading(true); //It will holds the loading state

    // Email verification
    axios.post(
      FORGOT_URL,
      JSON.stringify({
        "email": email,
      }),
      authHeader
    ).then((res) => {
      setAuthError("");
      console.log(res);
      navigate("/auth/reset-pass");
    }).catch((err) => {
      console.log(err.response.data);
      setAuthError(err.response.data.msg);

    })
      .finally(() => setIsLoading(false));
  };


  // forgot password
  const changePassword = (token, password, navigate) => {
    setIsLoading(true); //It will holds the loading state

    // Email verification
    axios.post(
      CHANGE_PASSWORD_URL,
      JSON.stringify({
        "token": token,
        "password": password,
      }),
      authHeader
    ).then((res) => {
      setAuthError("");
      console.log(res);
      navigate("/auth/sign-in");
    }).catch((err) => {
      console.log(err.response.data);
      setAuthError(err.response.data.msg);

    })
      .finally(() => setIsLoading(false));
  };

  const getUser = () => {
    var userInfo = JSON.parse(localStorage.getItem('user'));

    setUser(userInfo);

  }

  const getAdditionalUser = (user, token, navigate) => {
   
    const COUNTRIES_URL = "/user/get-countries";

    axios.get(
      COUNTRIES_URL,
      authHeader
    ).then((res) => {
      let data = res.data.data.countries;
     
     Object.keys(data).map((keys) => {
        if (user.countryId === data[keys].id) 
          return getCurrency(user, token, data[keys], navigate);
        

      });

     


    });

    
  }

  const getCurrency = (user, token, country, navigate) => {
    const CURENCY_URL = "/user/get-currencies?countryId=";
   
    axios.get(
      CURENCY_URL + country?.id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    ).then((res) => {
      
      let currency = res.data.data.currencies[0];

      const newUser = { token, user, country, currency};
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      if (!newUser.emailVerified) {
        navigate("/registration/verify-email");
      } else if (newUser.identityDocument === "") {
        navigate("/account-setup");
      } else {
        navigate("/dashboard/exchange");
      }
     


    }).catch(function(err) {
      // console.log(err);
    }
    );
  }



  const isObjectEmpty = (objectName) => {
    for (let prop in objectName) {
      if (objectName.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  };


  // SignOut
  const logOut = () => {
    
    setUser({})
    localStorage.removeItem("user");
  
  };






  return {
    user,
    authError,
    isLoading,
    registerUser,
    verifyEmail,
    logInUser,
    forgotPass,
    changePassword,
    getUser,
    sucessUser,
    logOut,
    showPin,
    setShowPin,
  };
};

export default useUser;
