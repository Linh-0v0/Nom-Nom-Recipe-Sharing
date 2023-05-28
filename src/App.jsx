import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DetailRecipePage from './pages/DetailRecipePage'
import PublishRecipe from './pages/PublishRecipe'
import AllRecipe from './pages/AllRecipe'
import RecoverPage from './pages/RecoverPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DietPage from './pages/DietPage'
import UserProfileMainPage from './pages/UserProfilePage'
import Refrigerator from './pages/Refrigerator'
import { CollectionRecipes } from './components/UserProfileComponents/UserProfileCollection/CollectionRecipes'
import { UpdateRecipe } from './components/UserProfileComponents/UserProfileRecipe/UpdateRecipe'
import MemberTable from './components/AboutUs/AboutUs'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const removeLoader = () => setLoading(false)
    window.addEventListener('load', removeLoader)
    return () => window.removeEventListener('load', removeLoader)
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/User" element={<UserProfileMainPage />} />
          <Route path="/Collection/:id" element={<CollectionRecipes />} />

          <Route path="/PublishRecipe" element={<PublishRecipe />} />
          <Route path="/AllRecipe" element={<AllRecipe />} />

          <Route path="/refrigerator" element={<Refrigerator />} />

          <Route path="/recipe/:name/:id" element={<DetailRecipePage />} />
          <Route
            path="/reset-password/:resetToken/:userId"
            element={<ResetPasswordPage />}
          />
          <Route path="/Recover" element={<RecoverPage />} />
          <Route path="/Diet" element={<DietPage />} />

          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/CreateRecipe" element={<PublishRecipe />} />
          <Route path="/temp" element={<UpdateRecipe />} />

          <Route path="/AboutUs" element={<MemberTable />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
