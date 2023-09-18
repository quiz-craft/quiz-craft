import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile";
import { isAuthenticated } from "./services/AuthStoreService";
import CreateQuiz from "./pages/quiz/create/CreateQuiz";
import TakeQuiz from "./pages/quiz/take/TakeQuiz";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isAuthenticated());

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <main className="flex flex-col h-screen">
          <Header isLoggedIn={isUserLoggedIn} />
          <div className="flex flex-grow flex-col items-center justify-normal m-20 p-10">
          <Routes>
            <Route path="signin" element={<SignIn handleLogin={handleLogin}  />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quiz/create" element={<CreateQuiz />} />
            <Route path="quiz/take" element={<TakeQuiz />} />
          </Routes>
          </div>
          <Footer/>
      </main>
      </BrowserRouter>
  );
}

export default App;
