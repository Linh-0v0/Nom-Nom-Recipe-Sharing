import React from 'react'
import styles from '../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import Frame from '../components/FormComponents/Frame'
import { withAuth } from '../components/SessionVerification/AuthChecking'
import ResetPasswordForm from '../components/FormComponents/ResetPasswordForm'
const ResetPasswordPage = ({}) => {
  return (
    <Frame
      Name={'Recover'}
      Form={<ResetPasswordForm></ResetPasswordForm>}
      Redirect={''}
    ></Frame>
  )
}

export default withAuth(ResetPasswordPage)
