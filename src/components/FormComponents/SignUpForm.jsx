import React, { useEffect, useState } from 'react' // Importing useEffect and useState from react
import axios from 'axios' // Importing axios library for making http requests
import styles from '../../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import { Button1, DisabledButton } from '../Button'
import useModal from '../ModalComponents/useModal'
import Modal from '../ModalComponents/Modal'
import { useNavigate } from 'react-router-dom'

export default function SignUpForm () {
  const [signUpEr, setSignUpEr] = useState(null)

  const [enteredData, setEnteredData] = useState({
    username: '',
    email: '',
    password: '',
    verifypassword: '',
    Errors: {} // Changing Errors to an object
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://nom-nom-recipe-web-be.herokuapp.com/auth/register',
        {
          username: enteredData.username,
          email: enteredData.email,
          password: enteredData.password,
          verifypassword: enteredData.verifypassword
        }
      )
      setSignUpEr(null)
      toggle()
    } catch (error) {
      console.error(error)
      setSignUpEr(error.response.data.msg)
      // Handle errors here, such as displaying an error message to the user.
    }
  }

  const changeHandler = event => {
    setEnteredData({
      ...enteredData,
      [event.target.name]: event.target.value
    })
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

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/

  function validateInput ({ username, email, password, verifypassword }) {
    const errors = {}

    if (!username || !email || !password || !verifypassword) {
      errors.general = 'Please fill in all fields'
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address'
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        'Password must be at least 8 characters and contain a lowercase letter, an uppercase letter, a special character,and a number'
    }

    if (verifypassword !== password) {
      errors.verifypassword = 'Passwords do not match'
    }

    return errors
  }

  useEffect(() => {
    setEnteredData(prevState => ({
      ...prevState,
      Errors: validateInput(prevState)
    }))
  }, [
    enteredData.username,
    enteredData.email,
    enteredData.password,
    enteredData.verifypassword
  ])

  const { isShowing, toggle } = useModal()

  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={'Account Created Successfully!'}
        modalMsg={
          'Your account has been created successfully. You can now log in and start exploring our website!'
        }
        closeable={false}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={() => {
          navigate('/login', { replace: true })
        }}
      />
      <div className={styles.formError}>{signUpEr}</div>
      <div>
        {enteredData.Errors.general && (
          <div className={styles.warning}>{enteredData.Errors.general}</div>
        )}

        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-user'}`}></i>

          <input
            className={styles.inputField}
            type="text"
            placeholder="Username"
            name="username"
            onChange={changeHandler}
            value={enteredData.username}
            autoComplete="off"
          />
        </div>

        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-envelope'}`}></i>

          <input
            className={styles.inputField}
            type="text"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
            value={enteredData.email}
            autoComplete="off"
          />
        </div>
        {enteredData.Errors.email && (
          <div className={styles.warning}>{enteredData.Errors.email}</div>
        )}

        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-lock'}`}></i>

          <input
            className={styles.inputField}
            type={passwordType}
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            value={enteredData.password}
          />
        </div>
        {enteredData.Errors.password && (
          <div className={styles.warning}>{enteredData.Errors.password}</div>
        )}

        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-lock'}`}></i>

          <input
            className={styles.inputField}
            type={passwordType}
            placeholder="Retype Password"
            name="verifypassword"
            onChange={changeHandler}
            value={enteredData.verifypassword}
          />
          <i
            className={`${styles.pswButton} ${passwordIcon}`}
            onMouseOver={togglePassword}
            onMouseLeave={togglePassword}
          ></i>
        </div>
        {enteredData.Errors.verifypassword && (
          <div className={styles.warning}>
            {enteredData.Errors.verifypassword}
          </div>
        )}
        <div className={styles.btnContainer}>
          {Object.keys(enteredData.Errors).length === 0 ? (
            <Button1
              type={'submit'}
              options={'Register'}
              fn={() => ''}
            ></Button1>
          ) : (
            <DisabledButton
              options={'Register'}
              disabled={true}
            ></DisabledButton>
          )}
        </div>
      </div>
    </form>
  )
}
