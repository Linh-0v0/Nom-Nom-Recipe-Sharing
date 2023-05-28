import { useRef, useState } from 'react'
import styles from '../../styles/UserProfile/UpdateForm.module.css'
import axios from 'axios'

export const UpdateForm = props => {
  const [image, setImage] = useState('')

  const handleChangeName = e => {
    props.setName(e.target.value)
  }

  const handleChangeNote = e => {
    props.setNote(e.target.value)
  }

  const fileTemp = useRef(null)
  const handleUploadImage = e => {
    setImage(e.target.files[0])
  }

  const handleTrigger = () => {
    fileTemp.current.click()
  }

  return (
    <form className={`${styles.updateForm} ${styles.flexColumn}`}>
      <div className={`${styles.one} ${styles.flexRow}`}>
        <div
          className={`${styles.updateName} ${styles.flexRow} ${styles.boxShadowPurple}`}
        >
          <label className={`${styles.label}`}>Name</label>
          <input
            className={styles.inputField}
            required={true}
            type="text"
            id="name"
            name="name"
            defaultValue={props.name}
            onChange={handleChangeName}
          />
        </div>
        <div
          className={`${styles.boxShadowPurple} ${styles.imageButton}`}
          onClick={handleTrigger}
          style={{ borderRadius: '8px' }}
        >
          <input
            className={`${styles.inputField}`}
            required={true}
            type="file"
            style={{ display: 'none' }}
            ref={fileTemp}
            onChange={e => handleUploadImage(e)}
          />
          <i className="fa-solid fa-images fa-lg"></i>
        </div>
      </div>
      {image ? (
        <div className={`${styles.updateImage}`}>
          <img style={{ width: '100%' }} src={URL.createObjectURL(image)} />
        </div>
      ) : null}
      <div
        className={`${styles.updateNote} ${styles.flexColumn} ${styles.boxShadowPurple}`}
      >
        <label className={`${styles.noteLabel}`}>Note</label>
        <textarea
          id="note"
          name="note"
          rows={10}
          defaultValue={props.note}
          onChange={handleChangeNote}
        ></textarea>
      </div>
    </form>
  )
}
