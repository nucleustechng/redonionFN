import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import OnboardingPage from "./Pages/Onboarding/OnboardingPage";

let isFirstTime = false;
const firstTimer = localStorage.getItem("firstTimer");

let isMobile = false;
let appInstalled = false;

if (window.innerWidth <= 550) {
  isMobile = true;
}

if (!firstTimer && isMobile) {
  localStorage.setItem("firstTimer", "true");
  isFirstTime = true;
} else if (firstTimer === "false") {
  isFirstTime = false;
  localStorage.setItem("firsTimer", "false");
}

// For iOS
if (window.navigator.standalone) {
  appInstalled = true;
}
// For Android
if (window.matchMedia("(display-mode: standalone)").matches) {
  appInstalled = true;
}

ReactDOM.render(
  <React.StrictMode>
    {isFirstTime && isMobile && appInstalled ? <OnboardingPage /> : <App />}
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
