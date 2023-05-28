import { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/UserProfile/UpdateForm.module.css'
import { UploadImage } from '../../ApiPost/LoadImage'
import Select from 'react-select'

export const UpdateRecipe = props => {
  const durUnits = [
    { value: 'minutes', label: 'minutes' },
    { value: 'hours', label: 'hours' }
  ]
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [dur, setDur] = useState('')
  const [durUnit, setDurunit] = useState('')
  const [serv, setServ] = useState('')
  const [servUnit, setServUnit] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const duration = Object.entries(props.data.duration)

    setDur(duration[0][1])
    setDurunit(duration[0][0])

    setName(props.data.name)
    setDes(props.data.description)
    setServ(props.data.serving_size)
    setServUnit(props.data.serving_unit)
  }, [])

  const handleOnChange = () => {
    props.setData({
      name: name,
      serving_size: serv,
      serving_unit: servUnit,
      duration: `${dur} ${durUnit}`,
      image_link: image,
      description: des
    })
  }

  const file = useRef(null)
  const handleUploadImage = e => {
    setImage(e.target.files[0])
  }

  const handleTrigger = () => {
    file.current.click()
  }

  return (
    <form
      className={`${styles.updateForm} ${styles.flexColumn}`}
      onChange={handleOnChange}
    >
      <div
        className={`${styles.updateName} ${styles.flexRow} ${styles.boxShadowPurple}`}
      >
        <label className={`${styles.label}`}>Name</label>
        <input
          className={`${styles.inputField}`}
          type="text"
          id="name"
          value={name}
          defaultValue={props.data.name}
          // placeholder={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div
        className={`${styles.updateName} ${styles.flexRow}  ${styles.oneLine}`}
      >
        <div
          className={`${styles.flexRow} ${styles.boxShadowPurple} ${styles.inputFieldContainer}`}
        >
          <input
            className={`${styles.inputField}`}
            type="number"
            name="servings"
            defaultValue={props.data.serving_size}
            value={serv}
            min={1}
            // placeholder={''}
            onChange={e => setServ(e.target.value)}
          />
          <input
            className={`${styles.inputField}`}
            type="text"
            name="servingUnit"
            value={servUnit}
            defaultValue={props.data.serving_unit}
            // placeholder={''}
            onChange={e => setServUnit(e.target.value)}
          ></input>
          {/* <span>serving(s)</span> */}
        </div>
        <div
          className={`${styles.flexRow} ${styles.boxShadowPurple} ${styles.inputFieldContainer}`}
        >
          <input
            className={`${styles.inputField}`}
            type="number"
            name="duration"
            defaultValue={dur}
            min={1}
            // placeholder={`${dur.val}`}
            onChange={e => setDur({ val: e.target.value, key: dur.key })}
          />

          <Select
            className={`${styles.inputField} ${styles.select}`}
            classNamePrefix="select"
            options={durUnits}
            defaultValue={durUnit}
            placeholder={durUnit}
            onChange={e => setDurunit(e.value)}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                width: '100%',
                padding: '0',
                boxShadow: state.isFocused ? 0 : 0,

                '&:hover': {
                  borderColor: '#ff8600',
                  outline: 'none'
                }
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                width: 'fit-content',
                height: '200px',
                overflow: 'auto',
                display: 'flex'
              }),

              valueContainer: (baseStyles, state) => ({
                ...baseStyles,
                padding: '0'
              })
            }}
          />
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
        <label className={`${styles.noteLabel}`}>Descriptions</label>
        <textarea
          id="note"
          name="note"
          rows={5}
          placeholder={des}
          onChange={e => setDes(e.target.value)}
        ></textarea>
      </div>
    </form>
  )
}
