import React from 'react'
import styles from '../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import Frame from '../components/FormComponents/Frame'
import LoginForm from '../components/FormComponents/LoginForm'
import { withAuth } from '../components/SessionVerification/AuthChecking'

const Login = ({}) => {
  return (
    <Frame
      Name={'Login'}
      Form={<LoginForm></LoginForm>}
      Redirect={
        <span className={styles.register}>
          Don't not have account? &nbsp;<a href="/SignUp">Register here</a>
        </span>
      }
    ></Frame>
  )
}

export default withAuth(Login)
