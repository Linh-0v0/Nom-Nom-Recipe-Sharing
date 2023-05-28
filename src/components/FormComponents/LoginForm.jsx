import styles from '../../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import { Button2 } from '../Button'
import React, { useState } from 'react'
import axios from 'axios'
import { FetchAllIngAndCountry } from '../ApiFetch/FetchAllIngAndCountry'

const LoginForm = () => {
  const [loginEr, setLoginEr] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://nom-nom-recipe-web-be.herokuapp.com/auth/login',
        {
          email: email,
          password: password
        }
      )
      localStorage.setItem(
        'accesstoken',
        JSON.stringify(response.data.accesstoken).replace(/"/g, '')
      )
      localStorage.setItem(
        'refreshtoken',
        JSON.stringify(response.data.refreshtoken).replace(/"/g, '')
      )

      window.location.replace('/')
      FetchAllIngAndCountry()
    } catch (error) {
      console.error(error)
      setLoginEr(error.response.data.error)
      // Handle errors here, such as displaying an error message to the user.
    }
  }

  const [passwordType, setPasswordType] = useState('password')
  const [passwordIcon, setPasswordIcom] = useState('fa-solid fa-eye-slash')

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      setPasswordIcom('fa-solid fa-eye')
      return
    }
    setPasswordType('password')
    setPasswordIcom('fa-solid fa-eye-slash')
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className={styles.formError}>{loginEr}</div>
      <div>
        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-envelope'}`}></i>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-lock'}`}></i>

          <input
            className={styles.inputField}
            type={passwordType}
            placeholder="Password"
            name="psw"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <i
            className={`${styles.pswButton} ${passwordIcon}`}
            onMouseOver={togglePassword}
            onMouseLeave={togglePassword}
          ></i>
        </div>
        <div className={styles.psw}>
          <span>
            <a href="/Recover">Forgot password?</a>
          </span>
        </div>
        <div className={styles.btnContainer}>
          <Button2 type={'submit'} options={'Login'} fn={() => ''}></Button2>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
