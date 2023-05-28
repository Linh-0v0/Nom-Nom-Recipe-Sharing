import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'
import Collections from './Collections'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../SessionVerification/AuthContext'
import { DefaultButton } from '../../Button'
import { UpdateButton } from '../UpdateProfileButton'
import axios from 'axios'
import Modal from '../../ModalComponents/Modal'
import useModal from '../../ModalComponents/useModal'
import { UploadCollectionImage } from '../../ApiPost/LoadImage'

export const CollectionSection = props => {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  const { userCollectionData } = useContext(AuthContext)

  const { isShowing, toggle } = useModal()

  if (!userCollectionData) {
    return <div>Loading user data...</div>
  }

  const style = {
    backgroundColor: 'var(--light-orange)',
    color: 'var(--black-purple)',
    backgroundColorHover: 'white',
    colorHover: 'var(--black-purple)'
  }

  const file = useRef(null)
  const onFileChange = e => {
    setImage(e.target.files[0])
  }
  const handleClickImage = () => {
    file.current.click()
  }

  const form = useRef(null)
  const handleDisplay = () => {
    form.current.style.display = 'flex'
  }

  const handleHide = () => {
    form.current.style.display = 'none'
  }

  let config = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/collection`,
    headers: {
      Authorization: localStorage.accesstoken
    },
    data: {
      name: name,
      note: note,
      recipeIds: []
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.request(config)
      UploadCollectionImage(image, res.data.collectionId)
      setMessage(res.data.message)
      toggle()
    } catch (error) {
      console.log(error)
    }
  }

  const collection = () => {
    if (userCollectionData.length > 0) {
      return userCollectionData.map(ele => (
        <Collections
          key={ele.collection_id}
          collection={ele}
          setCurrentStyle={props.setCurrentStyle}
          setUpdateForm={props.setUpdateForm}
        ></Collections>
      ))
    } else {
      return <div>You don't have any collection yet, please create one</div>
    }
  }

  return (
    <div
      className={`${styles.collectionMainContainer} ${styles.flexRow}`}
      style={{ display: `${props.display.collection}` }}
    >
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={''}
        modalMsg={message}
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={() => window.location.reload(false)}
      />
      <div className={`${styles.createNewContainer} ${styles.flexColumn}`}>
        <DefaultButton
          options={<i className="fa-solid fa-plus fa-xl"></i>}
          style={style}
          className={`${styles.createNewButton}`}
          fn={handleDisplay}
        />
        <form
          className={`${styles.createForm} ${styles.flexColumn} ${styles.boxShadowPurple}`}
          ref={form}
        >
          <div
            style={{
              width: '100%',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <i className="fa-solid fa-xmark fa-xl" onClick={handleHide}></i>
          </div>

          <div className={`${styles.flexRow}`} style={{ width: '100%' }}>
            <input
              style={{ display: 'none' }}
              ref={file}
              type="file"
              placeholder="Upload your image"
              onChange={e => onFileChange(e)}
            ></input>
            <div
              className={`${styles.imageFormControl}`}
              onClick={handleClickImage}
            >
              <div className={`${styles.imgContainer}`}>
                {image ? (
                  <div className={`${styles.uploadImage}`}>
                    <img
                      style={{ width: '100%' }}
                      src={URL.createObjectURL(image)}
                    />
                  </div>
                ) : (
                  <img
                    style={{ width: '100%' }}
                    src="/images/PlaceHolder.png"
                  ></img>
                )}
              </div>
              <i
                className="fa-solid fa-camera fa-xl"
                style={{
                  position: 'absolute',
                  display: 'none'
                }}
              ></i>
            </div>
            <div className={`${styles.formControl} ${styles.flexColumn}`}>
              <div className={`${styles.infoFormControl} ${styles.flexColumn}`}>
                <div className={`${styles.name} ${styles.flexRow}`}>
                  <label className={`${styles.labelName}`}>Name</label>
                  <input
                    type="text"
                    className={`${styles.inputField}`}
                    placeholder="Name for the collection"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className={`${styles.note} ${styles.flexColumn}`}>
                  <div className={`${styles.labelNote}`}>Note</div>
                  <textarea
                    rows={6}
                    name="note"
                    id="note"
                    placeholder="Please leaving a note here"
                    onChange={e => setNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <UpdateButton
                option={'Create'}
                className={styles.createButton}
                fn={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
      <div className={`${styles.collectionMainContainer} ${styles.flexRow}`}>
        {collection()}
      </div>
    </div>
  )
}

// export default CollectionSection
