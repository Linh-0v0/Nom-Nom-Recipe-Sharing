import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import { Button2, DisabledButton } from '../Button'
import { renderDom } from 'react-dom'
import axios from 'axios'
const ResetPasswordForm = () => {
  const { resetToken, userId } = useParams()
  const [validToken, setValidToken] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const validatedErrors = validateInput({ password, confirmPassword })
    setErrors(validatedErrors)
  }, [password, confirmPassword])

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  function validateInput({ password, confirmPassword }) {
    const errors = {}

    if (!password || !confirmPassword) {
      errors.general = 'Please fill in all fields'
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        'Password must be at least 8 characters and contain a lowercase letter, an uppercase letter, and a number'
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match'
    }

    return errors
  }

  useEffect(() => {
    const resetPassword = async (resetToken, userId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/reset-password/${resetToken}/${userId}`,
          {
            method: 'POST'
            // Additional request options (headers, body, etc.) can be included here
          }
        )
        const data = await response.json()
        if (data.msg === 'data and salt arguments required') {
          setValidToken(true)
        }
      } catch (error) {
        setValidToken(false)
      }
    }
    console.log(resetPassword(resetToken, userId))
  }, [resetToken, userId])

  if (validToken === false) {
    if (resetSuccess) {
      return <h2>Password reset successful!</h2>
    } else {
      return <h2>Invalid or expired reset token.</h2>
    }
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    // Perform password validation
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return
    }

    try {
      const url = `http://localhost:3000/reset-password/${resetToken}/${userId}`
      const data = { password: password }

      const response = await axios.post(url, data, {
        method: 'post'
      })
      setValidToken(false)
      setResetSuccess(true)

      // Assuming the password reset was successful
    } catch (error) {
      console.error(error) // Handle the error
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        {errors.password && (
          <div className={styles.warning}>{errors.password}</div>
        )}
        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-lock'}`}></i>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errors.confirmPassword && (
          <div className={styles.warning}>{errors.confirmPassword}</div>
        )}
        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-lock'}`}></i>
          <input
            placeholder="Retype Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>

      <div className={styles.btnContainer}>
        {Object.keys(errors).length === 0 ? (
          <Button2
            type={'submit'}
            options={'Reset Password'}
            fn={() => ''}
          ></Button2>
        ) : (
          <DisabledButton
            options={'Reset Password'}
            disabled={true}
          ></DisabledButton>
        )}
      </div>
    </form>
  )
}

export default ResetPasswordForm