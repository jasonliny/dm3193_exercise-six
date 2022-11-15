import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import React from "react";

import "./App.css";

import CreateUserPage from "./pages/CreateUser";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";

import Header from "./components/Header";

const firebaseConfig = {
  apiKey: "AIzaSyAZ-QvGyKiP8YVv-JWxNTrT1a5bWiM1NEs",
  authDomain: "dm3193-exercise-six.firebaseapp.com",
  projectId: "dm3193-exercise-six",
  storageBucket: "dm3193-exercise-six.appspot.com",
  messagingSenderId: "1008656341652",
  appId: "1:1008656341652:web:fce2b13579e70beab17281",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create",
    element: <CreateUserPage />,
  },
]);

function App() {
  const [AppInitialized, setAppInitialized] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [UserInformation, setUserInformation] = useState({});

  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if (AppInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          setUserInformation({});
          setIsLoggedIn(false);
        }
      });
    }
  }, [AppInitialized]);

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
