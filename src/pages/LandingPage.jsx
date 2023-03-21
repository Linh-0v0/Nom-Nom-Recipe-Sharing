import React from 'react'
import Sound from '../components/Sound'
import catLogo from '/images/cat.gif'
import '../styles/LandingPage.css'

const LandingPage = () => {
  return (
    <div className="container">
      <Sound />
      <div>
        <img src={catLogo} className="logo" alt="cat logo" />
        <p>Chán học đi quẩy 🫠👄</p>
      </div>
    </div>
  )
}

export default LandingPage
