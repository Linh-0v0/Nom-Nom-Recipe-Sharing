import React from 'react'
import styles from '../styles/LandingPage/LandingPage.module.css'
import { Button1 } from '../components/Button'
import Header from '../components/Header'
import { withAuth } from '../components/SessionVerification/AuthChecking'
import { useContext } from 'react'
import { AuthContext } from '../components/SessionVerification/AuthContext'
import Feed from '../components/Feed/Feed'
const LandingPage = () => {
  const { userData } = useContext(AuthContext)

  return (
    <div className={styles.page}>
      <div>
        <Header></Header>
      </div>
      {userData === null ? (
        <div className={styles.card}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.text}>
                <h1>Bring you to the world of food</h1>
                <p>
                  NomNom is a social platform where you can share and discover
                  recipes with a community of food lovers. Join now to find new
                  recipe inspirations and connect with other foodies.
                </p>
                <a href="/Login">
                  <Button1
                    type={'button'}
                    options={'Get Started'}
                    fn={() => ''}
                  ></Button1>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.photoContainer}>
            <div className={styles.photo}></div>
          </div>
        </div>
      ) : (
        <div className={styles.feed}>
          <Feed />
        </div>
      )}
    </div>
  )
}

export default LandingPage
