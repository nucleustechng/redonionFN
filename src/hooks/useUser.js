// React
import { useEffect, useState } from "react";

import axios from "../api/axios";

const REGISTER_URL = "/auth/sign-up";
const VERIFY_EMAIL_URL = "/auth/verify-email/";
const LOGIN_URL = "/auth/sign-in/";
const FORGOT_URL = "/auth/init-password-reset/";
const CHANGE_PASSWORD_URL = "/auth/complete-password-reset/";
const VERIFY_OTP_URL = "/auth/verify-otp/";

const useUser = () => {

  // States
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const [sucessUser, setSuccessUser] = useState(false);



  const authHeader = {

    headers: { "Content-Type": "application/json" }
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
      const newUser = { token, user};
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      navigate("/auth/otp-verification");

    }).catch((err) => {
      console.log(err.response.data);
      // err.response.data ? err.response.data.message[0] : 
      setAuthError(err.response.data.msg);

    })
      .finally(() => setIsLoading(false));
  };

  // Verify Email
  const verifyEmail = (code, navigate) => {
    setIsLoading(true); //It will holds the loading state

    // Email verification
    axios.get(
      VERIFY_EMAIL_URL + code,
      authHeader
    ).then((res) => {

      console.log(res)


      setAuthError("");

      // var userInfo = JSON.parse(localStorage.getItem('user'));

      // const user = userInfo.user;

      // const token = userInfo.token;
      // console.log(token)

      // const newUser = { token, user };
      // setUser(newUser);

      // localStorage.setItem("user", JSON.stringify(newUser));

      
      navigate("/dashboard/admin");
     

    }).catch((err) => {
      console.log(err.response.data);
      setAuthError(err.response.data.msg);

    })
      .finally(() => setIsLoading(false));
  };

  // Verify OTP
  const verifyOtp = (code, navigate) => {
    setIsLoading(true); //It will holds the loading state

    // Email verification
    axios.get(
      VERIFY_OTP_URL + code,
      authHeader
    ).then((res) => {

      console.log(res)


      setAuthError("");

      var userInfo = res.data.data;

      const user = userInfo.user;

      const token = userInfo.token;
     

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
      setAuthError("");

      const user = res.data.data.user;

      const token = res?.data?.data?.accessToken;

      const newUser = { token, user };
      setUser(newUser);
      console.log(newUser);
       if (newUser?.user?.roles[0] === "SUPER_ADMIN"){

         localStorage.setItem("user", JSON.stringify(newUser));
          if (!newUser.user.emailVerified) {
            navigate("/auth/otp-verification");
          } else {
            navigate("/dashboard/users");
          }
       }else{
         setAuthError('Error! You do not have permission!');
       }

      
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
    sucessUser,
    logOut,
    verifyOtp,
    showPin,
    setShowPin,
  };
};

export default useUser;
