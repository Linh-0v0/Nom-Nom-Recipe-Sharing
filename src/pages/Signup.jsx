import React from 'react'
import styles from '../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import Frame from '../components/LoginAndSIgnUpComponents/Frame'
import SignUpForm from '../components/LoginAndSIgnUpComponents/SignUpForm'
import {withAuth} from '../components/SessionVerification/AuthChecking'
const Signup = ({}) => {
  return (
    <Frame
      Name={'Register'}
      Form={<SignUpForm></SignUpForm>}
      Redirect={
        <span className={styles.register}>
          Already have account? &nbsp;<a href="/Login">Login here</a>
        </span>
      }
    ></Frame>
  )
}

export default withAuth(Signup)
