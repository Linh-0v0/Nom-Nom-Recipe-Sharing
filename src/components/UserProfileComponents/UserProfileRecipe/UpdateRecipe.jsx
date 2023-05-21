import { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/UserProfile/UpdateForm.module.css'
import { FetchRecipeByID } from '../../Fetch/Recipes/FetchRecipeByID'
import { UploadImage } from '../../ApiPost/LoadImage'
import Select from 'react-select'

export const UpdateRecipe = props => {
  // const { recipe } = FetchRecipeByID(props.id)

  // console.log(recipe && recipe)
  const durUnits = [
    { value: 'minutes', label: 'minutes' },
    { value: 'hours', label: 'hours' }
  ]
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [dur, setDur] = useState('')
  const [durUnit, setDurunit] = useState('')
  const [serv, setServ] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log(props.data)
    let duration = Object.entries(props.data.duration).map(
      ([key, val] = entry) => {
        setDur(val)
        setDurunit(key)
        // return { val, key }
      }
    )

    setName(props.data.name)
    setDes(props.data.description)
    setServ(props.data.serving_size)
  }, [])

  // console.log(dur)

  const handleOnChange = () => {
    props.setData({
      name: name,
      serving_size: serv,
      duration: `${dur} ${durUnit}`,
      image_link: image,
      description: des
    })
  }

  const file = useRef(null)
  const handleUploadImage = e => {
    // console.log('Hinh ne ba', e.target.file)
    setImage(e.target.files[0])
  }

  const handleTrigger = () => {
    file.current.click()
  }

  // console.log(props.data)

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
            defaultValue={dur}
            min={1}
            placeholder={`${dur.val}`}
            onChange={e => setDur({ val: e.target.value, key: dur.key })}
          />

          {/* <span>{duration[0].key}</span> */}
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
                // This line disable the blue border
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
