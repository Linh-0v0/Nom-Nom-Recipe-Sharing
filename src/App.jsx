import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DetailRecipePage from './pages/DetailRecipePage'
import PublishRecipe from './pages/PublishRecipe'
import AllRecipe from './pages/AllRecipe'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/Detail" element={<DetailRecipePage/>} />
          <Route path="/PublishRecipe" element={<PublishRecipe/>} />
          <Route path="/AllRecipe" element={<AllRecipe/>} />
          <Route path="/User-profile" element={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
