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
      {/* <div
        type="button"
        className={`${styles.closeButton}`}
        onClick={handleCloseButton}
      >
        X
      </div> */}
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
            // placeholder={props.name}
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
          {/* <span>Image</span> */}
          <i className="fa-solid fa-images fa-lg"></i>
        </div>
      </div>
      {image ? (
        // <div className={`${styles.uploadImage}`}>
        <div className={`${styles.updateImage}`}>
          <img
            // className={`${styles.uploadImage}`}
            style={{ width: '100%' }}
            src={URL.createObjectURL(image)}
          />
        </div>
      ) : // </div>
      null}
      <div
        className={`${styles.updateNote} ${styles.flexColumn} ${styles.boxShadowPurple}`}
      >
        <label className={`${styles.noteLabel}`}>Note</label>
        <textarea
          // rows={3}
          id="note"
          name="note"
          rows={10}
          // required={true}
          // value={props.note}
          defaultValue={props.note}
          // placeholder={props.note}
          onChange={handleChangeNote}
          // rows="5"
        ></textarea>
      </div>
      {/* <div className={`${styles.submitButton}`}> */}
      {/* <button
        className={`${styles.submitButton}`}
        type="submit"
        onClick={handleSubmit}
      >
        Update
      </button> */}
      {/* </div> */}
    </form>
  )
}
