import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Auth/Login';
import SignUp from "./pages/Auth/SignUp";
import Dashbord from "./pages/Home/Dashboard"
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import LandingPage from './pages/LandingPage';



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
        </Routes>
      </Router>

    </>
      
  )
}

export default App