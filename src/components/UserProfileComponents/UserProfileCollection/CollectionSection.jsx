import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'
import Collections from './Collections'
import img from '../../../images/recipeImage.png'
import { FetchUserCollections } from './FetchUserCollections'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../SessionVerification/AuthContext'
import { Button1, DefaultButton } from '../../Button'
import { UpdateButton } from '../UpdateProfileButton'
import { Post } from '../../ApiPost/Post'
import axios from 'axios'
// import { CollectionContext } from './UserCollectionContext'

const CollectionSection = props => {
  // const collection = {
  //   title: 'tet',
  //   description: 'lorem',
  //   img: img
  // }

  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState()

  const { userCollectionData } = useContext(AuthContext)
  // console.log('here:', userCollectionData)

  // const collections = FetchUserCollections()

  // console.log(collections)

  if (!userCollectionData) {
    return <div>Loading user data...</div>
  }

  // const style = {
  //   collection: props.display.collection,
  //   recipes: 'none'
  // }

  // const [display, setDisplay] = useState(style)

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
    console.log(file)
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
    url: `http://localhost:3000/collection`,
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
      // alert(res.data.message)
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }
  // const handleSubmit = () => {
  //   Post(name, note)
  // }

  const collection = userCollectionData.map(ele => (
    <Collections
      key={ele.collection_id}
      collection={ele}
      setCurrentStyle={props.setCurrentStyle}
      setUpdateForm={props.setUpdateForm}
      // setDisplay={setDisplay}
      // setSection={props.setSection}x
    ></Collections>
  ))

  return (
    <div
      className={`${styles.collectionMainContainer} ${styles.flexRow}`}
      style={{ display: `${props.display.collection}` }}
    >
      <div className={`${styles.createNewContainer} ${styles.flexColumn}`}>
        <DefaultButton
          options={
            <div>
              <i className="fa-solid fa-plus"></i>
            </div>
          }
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
            <i class="fa-solid fa-xmark fa-xl" onClick={handleHide}></i>
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
              <div
                className={`${styles.imgContainer}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleOut}
              >
                {image ? (
                  // <div className={`${styles.uploadImage}`}>
                  <img
                    // className={`${styles.uploadImage}`}
                    src={URL.createObjectURL(image)}
                  />
                ) : (
                  // </div>
                  <img src="https://s3-alpha-sig.figma.com/img/a9d5/c9e4/7bcdb80be4eeb5cc36cf4b46e74dcfb7?Expires=1684713600&Signature=F4xTgsc2NTv-yipgbW35D0ZnqIYtbU89Yvkj5G1RS8q2CzJTqepsgmLYrAhK3BAQqRfQHWffqfZjm~xYGx~e6CALP1nMzshTLDrlQadcWW37L7RoR78MHGxab2hTeVvcqfLjfZN8zTL2YO5tWo~gv2vGIVDuukj5ix~GzB0dYACKE5Emet8swVZyL~HCbg8nULIIW1FPFXgC3Yrx0bd33vWozIxfnpVutaix3hl4k~LOWckucsQuhO4aUF-FWi-8ET1a59-CSnsSJU2v-DM9ClYS1hEarBTksqNr-M-IfAMcdhGoC13b8F7CsTColwpJaz9TQj1-MZzigEIPSUZ1pg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
                )}
              </div>
              <i
                ref={camera}
                class="fa-solid fa-camera fa-xl"
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
        {collection}
      </div>
    </div>
  )
}

export default CollectionSection
