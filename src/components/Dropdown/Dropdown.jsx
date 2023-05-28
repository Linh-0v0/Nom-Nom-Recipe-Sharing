import React, { useState, useRef, useContext } from 'react'
import styles from '../../styles/Dropdown.module.css'
import { AuthContext } from '../SessionVerification/AuthContext'
import { Button2 } from '../Button'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
const Dropdown = props => {
  const navigate = useNavigate()
  const [imgUrl, setImgUrl] = useState('')

  const [isActive, setIsActive] = useState(false)
  const dropdownRef = useRef(null)

  const onClick = () => setIsActive(!isActive)

  const { logout, userData } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    axios
      .get(
        `https://nom-nom-recipe-web-be.herokuapp.com/user/get-avatar/${userData.user.id}`
      )
      .then(response => {
        setImgUrl(response.data)
      })
      .catch(error => {
        // Handle the error
        console.error(error)
      })
  }, [])
  const onSelectOption = option => {
    window.location.href = `${option.link}`
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={onClick}>
        <span> {props.username} </span>
        <img src={imgUrl} alt="User avatar" />
      </button>
      <ul
        className={`${styles.dropdownMenu} ${isActive ? styles.active : ''}`}
        ref={dropdownRef}
      >
        {props.options.map(option => (
          <li key={option.id} onClick={() => onSelectOption(option)}>
            <i className={option.icon}></i>
            {option.title}
          </li>
        ))}
        <Button2
          fn={handleLogout}
          options={'Logout'}
          icon={<i className="fa-solid fa-right-from-bracket"></i>}
        ></Button2>
      </ul>
    </div>
  )
}

export default Dropdown
