import { Link } from 'react-router-dom'
import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'

import { useState } from 'react'
import { UpdateButton } from '../UpdateProfileButton'
import { UpdateForm } from '../../FormComponents/UpdateForm'
import { RecipeTemp } from './RecipeTemp'
// import { CollectionRecipes } from './CollectionRecipes'
import useModal from '../../ModalComponents/useModal'
import Modal from '../../ModalComponents/Modal'
import axios from 'axios'
const Collections = props => {
  const handleDisplay = () => {
    props.setCurrentStyle('flex')
  }

  const { isShowing, toggle } = useModal(true)

  const [name, setName] = useState(props.collection.name)
  const [note, setNote] = useState(props.collection.note)

  let config = {
    method: 'PUT',
    url: `http://localhost:3000/collection/${props.collection.collection_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.accesstoken
    },
    data: { name: name, note: note }
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.request(config)
      // setMessage(res.data.message)
      refreshPage()
    } catch (error) {
      console.log(error)
    }
  }

  let configDelete = {
    method: 'DELETE',
    url: `http://localhost:3000/collection/${props.collection.collection_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.accesstoken
    }
  }

  const handleDelete = async () => {
    try {
      const res = await axios.request(configDelete)
      alert(res.data.message)
      refreshPage()
    } catch (error) {
      alert(error)
    }
  }

  const handleClick = () => {
    toggle()
  }

  // const handleSetSection = () => {
  //   props.setSection(<RecipeTemp id={props.collection.collection_id} />)
  // }

  const [imageURL, setImageURL] = useState(
    props.image || 'src/images/Default_img.svg'
  )
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    if (!imageError) {
      setImageURL('src/images/Default_img.svg')
      setImageError(true)
      console.log()
    }
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
      {/* <div
        // to={`/collection/${props.collection.collection_id}`}
        onClick={handleSetSection}
        key={props.collection.collection_id}
      >
        <div className={`${styles.contContainer} ${styles.flexColumn}`}>
          <img alt="collection image" src={props.collection.img} />
          <div className={`${styles.title}`}>{props.collection.name}</div>
          <div className={`${styles.textOverFlowEcllipse} ${styles.text}`}>
            {props.collection.note}
          </div>
        </div>
      </div> */}
      {/* <button onClick={handleClick} className={styles.updateDeleteContainer}>
        Update
      </button> */}
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={'Update collection'}
        modalMsg={
          <UpdateForm
            // collection={props.collection}
            setUpdateForm={props.setUpdateForm}
            setCurrentStyle={props.setCurrentStyle}
            setName={setName}
            setNote={setNote}
            name={name}
            note={note}
          />
        }
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={
          // console.log('hello') // navigate('/', { replace: true })
          handleSubmit
        }
      />
      <div className={`${styles.updateDeleteContainer} ${styles.flexRow}`}>
        <UpdateButton fn={handleClick} option={'Update'} />
        <UpdateButton fn={handleDelete} option={'Delete'}></UpdateButton>
      </div>
    </div>
  )
}

// export const addToCollection = props => {
//   const newList = props.collection.recipe.concat(recipe)
//   setlist(newList)
// }
export default Collections
