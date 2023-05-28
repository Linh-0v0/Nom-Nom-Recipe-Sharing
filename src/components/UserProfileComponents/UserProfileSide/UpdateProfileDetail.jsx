import { useEffect, useState } from 'react'
import styles from '../../../styles/UserProfile/UserProfileDetail/UserProfileDetail.module.css'
import { UpdateButton } from '../UpdateProfileButton'

export const UpdateProfileDetail = ({ props, onDataFromChild, error }) => {
  const [name, setName] = useState(props.username)
  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState('')
  const [veryPassword, setVeryPassword] = useState('')
  const [data, setData] = useState({})
  const [errors, setErrors] = useState('')
  const [isFormOk, setIsFormOk] = useState(false)

  useEffect(() => {
    const validatedErrors = validateInput({ password, veryPassword })
    setErrors(validatedErrors)
  }, [password, veryPassword])

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/

  function validateInput({ password, veryPassword }) {
    const errors = {}

    if (!password || !veryPassword) {
      errors.general = 'Please fill in all fields'
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        'Password must be at least 8 characters and contain a lowercase letter, an uppercase letter, and a number'
    }

    if (veryPassword !== password) {
      errors.veryPassword = 'Passwords do not match'
    }

    return errors
  }

  const [childMessage, setChildMessage] = useState('')

  const handleChangeName = e => {
    setName(e.target.value)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const handleVerifyPassword = e => {
    setVeryPassword(e.target.value)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      const updatedData = {
        username: name,
        password: password,
        verifypassword: veryPassword
      }
      setData(updatedData)
      handleChildData(updatedData)
    } else {
      setData('')
      handleChildData('')
    }
  }, [name, password, veryPassword, errors])

  const handleChildData = updatedData => {
    setChildMessage(updatedData)
    onDataFromChild(updatedData)
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
    <form
      autoComplete="off"
      className={`${styles.formContainer} ${styles.flexRow} ${styles.form}`}
    >
      <div className={styles.infoUpdate}>
        {error ? <div className={styles.warning}>{error}</div> : ''}

        <div>
          <label>Username:</label>
          <input
            className={`${styles.inputField}`}
            type="text"
            name="username"
            id="username"
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <div>
          {errors.password && (
            <div className={styles.warning}>{errors.password}</div>
          )}
          <label>Password:</label>
          <input
            className={`${styles.inputField}`}
            type={passwordType}
            name="password"
            id="password"
            placeholder="New password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div>
          {errors.veryPassword && (
            <div className={styles.warning}>{errors.veryPassword}</div>
          )}
          <label>Retype-Password:</label>
          <div>
            <input
              className={`${styles.inputField}`}
              type={passwordType}
              name="verify password"
              id="verify password"
              placeholder="Re-type password"
              value={veryPassword}
              onChange={handleVerifyPassword}
            />
            <i
              className={`${styles.pswButton} ${passwordIcon}`}
              onMouseOver={togglePassword}
              onMouseLeave={togglePassword}
            ></i>
          </div>
        </div>
      </div>
    </form>
  )
}
