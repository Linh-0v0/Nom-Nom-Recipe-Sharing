import { useState } from 'react'
import styles from '../../styles/UserProfile/UpdateForm.module.css'
import axios from 'axios'

export const UpdateForm = props => {
  // const [name, setName] = useState(props.collectionData.name)
  // const [note, setNote] = useState(props.collectionData.note)
  // const [name, setName] = useState(props.collection.name)
  // const [note, setNote] = useState(props.collection.note)
  // const [image, setImage] = useState('')
  // const [message, setMessage] = useState('')

  const handleChangeName = e => {
    props.setName(e.target.value)
  }

  const handleChangeNote = e => {
    props.setNote(e.target.value)
  }

  // const handleCloseButton = () => {
  //   props.setUpdateForm(<div></div>)
  //   props.setCurrentStyle('none')
  // }

  return (
    <form className={`${styles.updateForm} ${styles.flexColumn}`}>
      {/* <div
        type="button"
        className={`${styles.closeButton}`}
        onClick={handleCloseButton}
      >
        X
      </div> */}

      <div className={`${styles.updateImage}`}></div>
      <div
        className={`${styles.updateName} ${styles.flexRow} ${styles.boxShadowPurple}`}
      >
        <label className={`${styles.label}`}>Name</label>
        <input
          className={styles.inputField}
          type="text"
          id="name"
          name="name"
          // value={props.name}
          placeholder={props.name}
          onChange={handleChangeName}
        />
      </div>
      <div
        className={`${styles.updateNote} ${styles.flexColumn} ${styles.boxShadowPurple}`}
      >
        <label className={`${styles.noteLabel}`}>Note</label>
        <textarea
          // rows={3}
          id="note"
          name="note"
          rows={10}
          // value={props.note}
          placeholder={props.note}
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
