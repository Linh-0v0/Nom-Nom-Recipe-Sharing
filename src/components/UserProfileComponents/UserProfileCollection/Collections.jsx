import { Link } from 'react-router-dom'
import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'

import { useEffect, useState } from 'react'
import { UpdateButton } from '../UpdateProfileButton'
import { UpdateForm } from '../../FormComponents/UpdateForm'
import { RecipeTemp } from './RecipeTemp'

import defaultImg from '/images/Default_img.svg'
import useModal from '../../ModalComponents/useModal'
import Modal from '../../ModalComponents/Modal'
import axios from 'axios'
import { UploadCollectionImage } from '../../ApiPost/LoadImage'
const Collections = props => {
  const handleDisplay = () => {
    props.setCurrentStyle('flex')
  }

  const { isShowing, ndIsShowing, toggle, secondToggle } = useModal(true)

  const [name, setName] = useState(props.collection.name)
  const [note, setNote] = useState(props.collection.note)
  const [message, setMessage] = useState('')
  const [imageURL, setImageURL] = useState('')

  let config = {
    method: 'PUT',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/collection/${props.collection.collection_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.accesstoken
    },
    data: { name: name, note: note }
  }

  let configImg = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/collection/get-img/${props.collection.collection_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.accesstoken
    }
  }

  useEffect(() => {
    axios
      .request(configImg)
      .then(res => {
        if (res.data == 'Cannot get image.') {
          setImageURL(defaultImg)
        } else {
          setImageURL(res.data)
        }
      })
      .catch(error => console.log(error))
  })

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.request(config)
      setMessage(res.data.message)
      UploadCollectionImage(imageURL, props.collection.collection_id)
      toggle()
      secondToggle()
    } catch (error) {
      console.log(error)
    }
  }

  let configDelete = {
    method: 'DELETE',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/collection/${props.collection.collection_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.accesstoken
    }
  }

  const handleDelete = async () => {
    try {
      const res = await axios.request(configDelete)
      setMessage(res.data.message)
      secondToggle()
    } catch (error) {
      setMessage(res.data.message)
    }
  }

  const handleClick = () => {
    toggle()
  }

  return (
    <div
      className={`${styles.collectionContainer} ${styles.boxShadowPurple} ${styles.flexColumn}`}
    >
      <Link
        to={`/collection/${props.collection.collection_id}`}
        key={props.collection.collection_id}
      >
        <div className={`${styles.contContainer} ${styles.flexColumn}`}>
          <img alt="collection image" src={imageURL} />
          <div className={`${styles.title}`}>{props.collection.name}</div>
          <div className={`${styles.textOverFlowEcllipse} ${styles.text}`}>
            {props.collection.note}
          </div>
        </div>
      </Link>

      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={'Update collection'}
        modalMsg={
          <UpdateForm
            setUpdateForm={props.setUpdateForm}
            setCurrentStyle={props.setCurrentStyle}
            setName={setName}
            setNote={setNote}
            name={name}
            note={note}
            image={imageURL}
            setImage={setImageURL}
          />
        }
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={handleSubmit}
      />
      <Modal
        isShowing={ndIsShowing}
        hide={secondToggle}
        btnMsg={'Confirm'}
        title={''}
        modalMsg={message}
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={() => {
          refreshPage()
        }}
      />
      <div className={`${styles.updateDeleteContainer} ${styles.flexRow}`}>
        <UpdateButton fn={handleClick} option={'Update'} />
        <UpdateButton fn={handleDelete} option={'Delete'}></UpdateButton>
      </div>
    </div>
  )
}

export default Collections
