import { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/UserProfile/UpdateForm.module.css'
import { FetchRecipeByID } from '../../Fetch/Recipes/FetchRecipeByID'

export const UpdateRecipe = props => {
  // const { recipe } = FetchRecipeByID(props.id)

  // console.log(recipe && recipe)
  let duration = [{ val: '', key: '' }]
  const durUnits = ['minutes', 'hours']
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [dur, setDur] = useState('')
  const [serv, setServ] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    console.log(props.data)
    duration = Object.entries(props.data.duration).map(([key, val] = entry) => {
      return `${val} ${key}`
    })
    setDur(duration[0].val)
    setName(props.data.name)
    setDes(props.data.description)
    setServ(props.data.serving_size)
  }, [])

  const handleOnChange = () => {
    props.setData({
      name: name,
      serving_size: serv,
      duration: {
        hour: dur
      },
      image_link: image,
      description: des
    })
  }

  const file = useRef(null)
  const handleUploadImage = e => {
    // console.log('Hinh ne ba', e.target.file)
    setImage(e.target.file[0])
  }

  const handleTrigger = () => {
    file.current.click()
  }

  console.log(props.data)

  return (
    <form
      className={`${styles.updateForm} ${styles.flexColumn}`}
      onChange={handleOnChange}
    >
      <div
        className={`${styles.updateName} ${styles.flexRow} ${styles.boxShadowPurple}`}
      >
        {/* dsdas */}
        <label className={`${styles.label}`}>Name</label>
        <input
          className={`${styles.inputField}`}
          type="text"
          id="name"
          placeholder={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={`${styles.updateName} ${styles.flexRow}`}>
        <div
          className={`${styles.flexRow} ${styles.boxShadowPurple} ${styles.inputFieldContainer}`}
        >
          <input
            className={`${styles.inputField}`}
            type="number"
            name="servings"
            min={1}
            placeholder={''}
            onChange={e => setServ(e.target.value)}
          />
          <span>serving(s)</span>
        </div>
        <div
          className={`${styles.flexRow} ${styles.boxShadowPurple} ${styles.inputFieldContainer}`}
        >
          <input
            className={`${styles.inputField}`}
            type="number"
            name="duration"
            min={1}
            placeholder={serv}
            onChange={e => setDur(e.target.value)}
          />

          {/* <span>{duration[0].key}</span> */}
          <span>{duration[0].key}</span>
        </div>
        <div
          className={`${styles.boxShadowPurple} ${styles.imageButton}`}
          onClick={handleTrigger}
        >
          <input
            className={`${styles.inputField}`}
            type="file"
            style={{ display: 'none' }}
            ref={file}
            onChange={handleUploadImage}
          />
          {/* <span>Image</span> */}
          <i class="fa-solid fa-images fa-lg"></i>
        </div>
      </div>

      {image ? (
        // <div className={`${styles.uploadImage}`}>
        <div className={`${styles.updateImage}`}>
          <img
            // className={`${styles.uploadImage}`}
            src={URL.createObjectURL(image)}
          />
        </div>
      ) : // </div>
      null}
      <div
        className={`${styles.updateNote} ${styles.flexColumn} ${styles.boxShadowPurple}`}
      >
        <label className={`${styles.noteLabel}`}>Descriptions</label>
        <textarea
          // rows={3}
          id="note"
          name="note"
          rows={5}
          // value={props.note}
          placeholder={des}
          onChange={e => setDes(e.target.value)}
          // rows="5"
        ></textarea>
      </div>
    </form>
  )
}
