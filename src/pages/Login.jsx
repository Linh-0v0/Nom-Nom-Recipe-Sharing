import React from 'react'
import styles from '../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import Frame from '../components/LoginAndSIgnUpComponents/Frame'
import LoginForm from '../components/LoginAndSIgnUpComponents/LoginForm'
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

export default Login
