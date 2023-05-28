import React from 'react'
import styles from '../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import Frame from '../components/FormComponents/Frame'
import RecoverForm from '../components/FormComponents/RecoverForm'
import { withAuth } from '../components/SessionVerification/AuthChecking'
const RecoverPage = ({}) => {
  return (
    <Frame
      Name={'Recover'}
      Form={<RecoverForm></RecoverForm>}
      Redirect={
        <span className={styles.register}>
          Already have account? &nbsp;<a href="/Login">Login here</a>
        </span>
      }
    ></Frame>
  )
}

export default withAuth(RecoverPage)
