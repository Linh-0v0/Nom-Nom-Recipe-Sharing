import styles from '../../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import Header from '../Header'

export default function Frame({ Name, Form, Redirect }) {
  return (
    <div className={styles.page}>
      <div>
        <Header></Header>
      </div>
      <div className={styles.card}>
        <div className={styles.photoContainer}>
          <div className={styles.photo}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h2>{Name}</h2>
              {Form}
              <hr />
              {Redirect}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
