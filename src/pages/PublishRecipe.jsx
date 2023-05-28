import styles from '../styles/PublishRecipe.module.css'
import Header from '../components/Header'
import { FetchAllIngAndCountry } from '../components/ApiFetch/FetchAllIngAndCountry.jsx'
import Select from 'react-select'
import axios from 'axios'
import Modal from '../components/ModalComponents/Modal'
import useModal from '../components/ModalComponents/useModal'
import { UploadImage } from '../components/ApiPost/LoadImage'
import { withoutAuth } from '../components/SessionVerification/AuthChecking'
import { useState, useRef, useEffect } from 'react'
const PublishRecipe = () => {
  const { countryOptions, unitOptions, ingredientOPtion, dietOptions } =
    FetchAllIngAndCountry()
  const durationUnits = ['hours', 'minutes']
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [duration, setDuration] = useState(1)
  const [servings, setServings] = useState(1)
  const [ingredients, setIngredients] = useState([
    { ingredientId: '', quantity: 1, unit_name: '' }
  ])

  const [nullMess, setNullMess] = useState('')

  const [servingUnit, setServingUnit] = useState('')

  const [message, setMessage] = useState('')

  const { isShowing, toggle } = useModal()

  const [diets, setDiets] = useState([])

  const servingUnitOpt = [
    { value: 'piece(s)', label: 'piece(s)' },
    { value: 'people', label: 'people' },
    { value: 'bowl(s)', label: 'bowl(s)' },
    { value: 'plate(s)', label: 'plate(s)' }
  ]

  const handleAddOrigin = e => {
    setOrigin(e.value)
  }

  const handleIngredientChange = (e, igd) => {
    let newIngredients = [...ingredients]
    for (let ingredient of newIngredients) {
      if (ingredient.id === e.value) {
        alert('Cannot add more')
        return newIngredients
      }
    }
    newIngredients[igd].ingredientId = e.value
  }

  const handleQuantity = (e, igd) => {
    let newIngredients = [...ingredients]

    if (e.target.value == '') {
      console.log(e.target.value)
      newIngredients[igd].quantity = 1
    } else {
      newIngredients[igd].quantity = e.target.value
    }
  }

  const handleUnit = (e, igd) => {
    let newIngredients = [...ingredients]
    newIngredients[igd].unit_name = e.value
  }

  const handleDietAdd = e => {
    let temp = []
    for (let i = 0; i < e.length; i++) {
      temp.push(e[i].value)
    }

    setDiets(temp)
  }

  const handleAddIngredient = () => {
    for (let ingredient of ingredients) {
      if (
        ingredient.ingredientId === '' ||
        ingredient.quantity == 0 ||
        ingredient.unit_name === ''
      ) {
        // alert()
        setNullMess('Please fill in the empty field before create more')
        return
      }
    }
    setNullMess('')
    setIngredients([
      ...ingredients,
      { ingredientId: '', quantity: 1, unit_name: '' }
    ])
  }

  const handleRemoveIngredient = igd => {
    const newIngredients = [...ingredients]
    newIngredients.splice(igd, 1)
    setIngredients(newIngredients)
  }

  const file = useRef(null)

  const onFileChange = e => {
    setImage(e.target.files[0])
  }

  const handleUploadImage = () => {
    file.current.click()
  }

  let config = {
    method: 'post',
    url: 'https://nom-nom-recipe-web-be.herokuapp.com/recipe',
    headers: {
      Authorization: localStorage.accesstoken
    },
    data: {
      name: name,
      servingSize: servings,
      servingUnit: servingUnit,
      duration:
        duration == '' || duration == 0
          ? 1 + ' ' + durationUnits[1]
          : duration + ' ' + durationUnits[1],
      imageLink: image,
      description: description,
      ingredients: ingredients,
      dietaryPrefs: diets,
      countryPrefs: [origin]
    }
  }

  const handleCreateRecipe = async () => {
    try {
      const res = await axios.request(config)
      if (image !== '') {
        UploadImage(image, res.data.recipeId, setMessage)
      }

      setMessage(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (
      name !== '' &&
      description !== '' &&
      origin !== '' &&
      duration !== '' &&
      servings != ''
    ) {
      for (let ingredient of ingredients) {
        if (
          ingredient.ingredientId === '' ||
          ingredient.unit_name === '' ||
          ingredient.unit_name === null
        ) {
          alert('Please do not leave any field null before submit')
          return
        }
      }
      try {
        handleCreateRecipe()
        toggle()
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Please do not leave any field null before submit')
    }
  }

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <Modal
          isShowing={isShowing}
          hide={toggle}
          btnMsg={'Confirm'}
          title={''}
          modalMsg={message}
          closeable={true}
          titleIcon={<i className="fa-solid fa-circle-check"></i>}
          btnFn={() => {
            toggle()
            refreshPage()
          }}
        />
        <form className={styles.publish}>
          {/* <form className={styles.publish} onSubmit={handleSubmit}> */}
          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={`${styles.inputFieldContainer} ${styles.flexRow}`}>
              <label className={`${styles.fieldLabel}`}>Name</label>
              <input
                type="text"
                required
                value={name}
                className={`${styles.inputField}`}
                onChange={e => setName(e.target.value)}
              />
            </div>
            {name ? '' : <span>This field is required</span>}
          </div>

          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={`${styles.inputFieldContainer} ${styles.flexRow}`}>
              <label className={`${styles.fieldLabel}`}>Image</label>
              {image ? (
                <>
                  <span>{image.name}</span>
                </>
              ) : (
                <span style={{ width: '100%' }}>Upload your image</span>
              )}
              <input
                className={`${styles.inputField} `}
                style={{ visibility: 'hidden' }}
                ref={file}
                type="file"
                placeholder="Upload your image"
                onChange={e => onFileChange(e)}
              />

              <div
                className={`${styles.uploadImageButton}`}
                onClick={handleUploadImage}
              >
                <img
                  width="36"
                  height="36"
                  src="https://img.icons8.com/dotty/80/add-image.png"
                  alt="add-image"
                />
              </div>
            </div>
          </div>
          {image ? (
            <div className={`${styles.uploadImage}`}>
              <img src={URL.createObjectURL(image)} />
            </div>
          ) : null}

          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={styles.title}>Description</div>
            <textarea
              className={`${styles.textArea}`}
              required
              value={description}
              rows={12}
              onChange={e => setDescription(e.target.value)}
            />
            {description ? '' : <span>This field is required</span>}
          </div>

          <div className={styles.oneline}>
            <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
              <div
                className={`${styles.inputFieldContainer} ${styles.flexRow}`}
              >
                <Select
                  className={`${styles.inputField} ${styles.select}`}
                  required
                  classNamePrefix="select"
                  options={countryOptions}
                  placeholder={`Recipe origin`}
                  onChange={e => handleAddOrigin(e)}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      width: '100%',
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
                    })
                  }}
                />
              </div>
              {origin ? '' : <span>This field is required</span>}
            </div>
            <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
              <div
                className={`${styles.inputFieldContainer} ${styles.flexRow} ${styles.duration}`}
              >
                <input
                  className={`${styles.inputField}`}
                  type="number"
                  required
                  // defaultValue={1}
                  value={duration}
                  min={'1'}
                  placeholder="1"
                  onChange={e => setDuration(e.target.value)}
                />
                <label>{durationUnits[1]}</label>
              </div>
              {duration ? '' : <span>This field is require</span>}
            </div>
            <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
              <div
                className={`${styles.inputFieldContainer} ${styles.flexRow} ${styles.serving}`}
              >
                <input
                  className={`${styles.inputField}`}
                  required
                  // defaultValue={1}
                  type="number"
                  min={'1'}
                  value={servings}
                  onChange={e => setServings(e.target.value)}
                />
                <input
                  className={`${styles.inputField}`}
                  required
                  defaultValue={'Servings'}
                  type="text"
                  // min={'1
                  placeholder={'Servings'}
                  // value={servingUnit}
                  onChange={e => setServingUnit(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={`${styles.inputFieldContainer} ${styles.flexRow}`}>
              <label className={`${styles.fieldLabel}`}>
                Dietary preferences
              </label>

              <Select
                className={`${styles.inputField} ${styles.select}`}
                classNamePrefix="select"
                isMulti
                required
                options={dietOptions}
                onChange={e => handleDietAdd(e)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    width: '100%',
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
                  })
                }}
              />
            </div>
          </div>

          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={styles.title}>Ingredients:</div>
            <ul className={`${styles.addIngredientContainer}`}>
              {ingredients.map((ingredient, igd) => (
                <div key={igd}>
                  <div
                    className={`${styles.ingredientInputContainer} ${styles.flexRow} ${styles.inputFieldContainer}`}
                  >
                    <Select
                      className={`${styles.inputField} ${styles.select}`}
                      classNamePrefix="select"
                      required
                      options={ingredientOPtion}
                      placeholder={`Enter ingredient`}
                      onChange={e => handleIngredientChange(e, igd)}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: 'none',
                          width: '100%',
                          boxShadow: state.isFocused ? 0 : 0,

                          '&:hover': {
                            borderColor: '#ff8600',
                            outline: 'none'
                          }
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          width: 'fit-content',
                          height: '160px',
                          overflow: 'auto',
                          display: 'flex'
                        })
                      }}
                    />

                    <input
                      type="number"
                      required
                      className={`${styles.inputField}`}
                      name="quantity"
                      min={1}
                      placeholder={1}
                      defaultValue={1}
                      onChange={e => handleQuantity(e, igd)}
                    />
                    <Select
                      className={`${styles.inputField} ${styles.select}`}
                      classNamePrefix="select"
                      name={'ingre'}
                      required
                      options={unitOptions}
                      placeholder={'unit'}
                      // defaultInputValue='grams'
                      onChange={e => handleUnit(e, igd)}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: 'none',
                          width: '100%',
                          boxShadow: state.isFocused ? 0 : 0,

                          '&:hover': {
                            borderColor: '#ff8600',
                            outline: 'none'
                          }
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          width: 'fit-content',
                          height: '120px',
                          overflow: 'auto',
                          display: 'flex'
                        })
                      }}
                    />
                    <i
                      className={`${
                        styles.delete
                      } ${'fa-solid fa-delete-left'}`}
                      onClick={() => handleRemoveIngredient(igd)}
                    ></i>
                  </div>
                </div>
              ))}
            </ul>
            <div
              className={styles.addIgd}
              type="button"
              onClick={handleAddIngredient}
            >
              <i className="fa-solid fa-circle-plus"></i>
              <span> Add More Ingredients </span>
            </div>
            <div>{nullMess}</div>
          </div>
          <div className={styles.btnWrap}>
            <button
              className={styles.submitBtn}
              type="submit"
              onClick={e => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withoutAuth(PublishRecipe)
