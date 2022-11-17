import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import React from "react";

import "./App.css";

import CreateUserPage from "./pages/CreateUser";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";

// import Header from "./components/Header";

const firebaseConfig = {
  apiKey: "AIzaSyAZ-QvGyKiP8YVv-JWxNTrT1a5bWiM1NEs",
  authDomain: "dm3193-exercise-six.firebaseapp.com",
  projectId: "dm3193-exercise-six",
  storageBucket: "dm3193-exercise-six.appspot.com",
  messagingSenderId: "1008656341652",
  appId: "1:1008656341652:web:fce2b13579e70beab17281",
};

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          setUserInformation({});
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  console.log(userInformation);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserProfilePage
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/login",
      element: (
        <LoginPage
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      path: "/create",
      element: (
        <CreateUserPage
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
