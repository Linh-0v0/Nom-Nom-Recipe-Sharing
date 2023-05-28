import styles from '../../styles/LoginAndSignUp/LoginAndSignUp.module.css'
import { Button2, DisabledButton } from '../Button'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useModal from '../ModalComponents/useModal'
import Modal from '../ModalComponents/Modal'

const RecoverForm = () => {
  const [email, setEmail] = useState('')
  const [isDataSend, setIsDataSend] = useState(false)

  const [modalProps, setModalProps] = useState({
    title: '',
    msg: '',
    icon: ''
  })

  const { isShowing, toggle } = useModal()

  const handleSubmit = async e => {
    e.preventDefault()

    axios
      .post('https://nom-nom-recipe-web-be.herokuapp.com/forgot-password', {
        email: email
      })
      .then(response => {
        setModalProps(prevState => ({
          ...prevState,
          title: 'Success',
          msg: response.data.msg,
          icon: 'fa-solid fa-circle-check'
        }))
        setIsDataSend(true)
        toggle()
      })
      .catch(error => {
        if (error.response) {
          setModalProps(prevState => ({
            ...prevState,
            title: 'Error',
            msg: error.response.data.msg,
            icon: 'fa-solid fa-circle-xmark'
          }))

          toggle()
        } else {
          console.error(error)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={modalProps.title}
        modalMsg={modalProps.msg}
        closeable={false}
        titleIcon={<i className={modalProps.icon}></i>}
        btnFn={() => {
          toggle()
        }}
      />
      <div>
        <div className={styles.inputContainer}>
          <i className={`${styles.icon} ${'fa-solid fa-envelope'}`}></i>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.btnContainer}>
          {isDataSend ? (
            <DisabledButton options={'Send'} />
          ) : (
            <Button2 type={'submit'} options={'Send'} fn={() => ''}></Button2>
          )}
        </div>
      </div>
    </form>
  )
}

export default RecoverForm
