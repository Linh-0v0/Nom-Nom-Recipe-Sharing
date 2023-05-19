import styles from '../styles/Header.module.css'
import nomNomLogo from '../images/NomNomHorizontalLogo.png'
import { Button1, Button2 } from './Button'
import { useContext } from 'react'
import { AuthContext } from './SessionVerification/AuthContext'
import Dropdown from './Dropdown/Dropdown'
import NavBar from './NavBar'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Header = () => {
  const { userData } = useContext(AuthContext)

  const tabList = [
    { key: 1, name: 'Recipes', link: '/allRecipe', active: false },
    { key: 2, name: 'Refrigerator', link: '/refrigerator', active: false },
    { key: 3, name: 'About us', link: '/AboutUS', active: false }
  ]
  return (
    <header className={`${styles.header} ${styles.flexRow}`}>
      <div
        className={`${styles.logoContainer} ${styles.flexItemCenter}`}
        typeof="image"
      >
        <a href="/">
          <img src={nomNomLogo} alt="nom-nom-logo" />
        </a>
      </div>
      {/* <nav className={`${styles.navBar} ${styles.flexItemCenter}`}> */}
      {/* <ul className={`${styles.flexItemCenter}`}>{items}</ul> */}
      {/* TODO Make items clickable */}
      {/* </nav> */}
      <NavBar tabList={tabList}></NavBar>
      <div
        className={`${styles.loginSignupContainer} ${styles.flexItemCenter}`}
      >
        {userData === null ? (
          <div className={styles.loginSignup}>
            <a href="/Login">
              <Button1
                type={'button'}
                options={'Login'}
                fn={() => ''}
              ></Button1>
            </a>
            <a href="/SignUp">
              <Button2
                type={'button'}
                options={'Register'}
                fn={() => ''}
              ></Button2>
            </a>
          </div>
        ) : (
          <div>
            <Dropdown
              username={userData.user.username}
              options={[
                {
                  id: 1,
                  title: 'Profile',
                  icon: 'fa-solid fa-user',
                  link: `/user`
                },
                {
                  id: 2,
                  title: 'Diet Plan',
                  icon: 'fa-solid fa-utensils',
                  link: '/diet'
                },
                {
                  id: 3,
                  title: 'Add Recipe',
                  icon: 'fa-solid fa-pen-to-square',
                  link: '/PublishRecipe'
                }
              ]}
            ></Dropdown>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
