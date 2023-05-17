import React, { useRef, useState } from 'react'
import styles from '../styles/PublishRecipe.module.css'
import Header from '../components/Header'
import { useEffect } from 'react'
import { FetchAllIngAndCountry } from '../components/Fetch/FetchAllIngAndCountry'
import Select from 'react-select'
import axios from 'axios'
import { DefaultButton } from '../components/Button'
import Modal from '../components/ModalComponents/Modal'
import useModal from '../components/ModalComponents/useModal'

const PublishRecipe = () => {
  const { countryOptions, unitOptions, ingredientOPtion, dietOptions } =
    FetchAllIngAndCountry()
  // console.log(countryOptions)
  // console.log(unitOptions[0])

  // const unitArray = Array.from(unitOptions)
  // useEffect(() => {
  //   console.log(unitArray)
  // }, [])

  const durationUnits = ['hours', 'minutes']
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [duration, setDuration] = useState('')
  const [servings, setServings] = useState('')
  const [ingredients, setIngredients] = useState([
    { ingredientId: '', quantity: '', unit_name: `` }
  ])

  const [message, setMessage] = useState('')

  const { isShowing, toggle } = useModal()

  const [diets, setDiets] = useState([])

  useEffect(() => {
    // console.log(ingredients)
    console.log('Diet ne ', diets)
  }, [diets])

  const handleAddOrigin = e => {
    console.log('Origin ne hihi', e.value)
    setOrigin(e.value)
  }

  const handleIngredientChange = (e, igd) => {
    let newIngredients = [...ingredients]
    for (let i = 0; i < newIngredients.length; i++) {
      if (newIngredients[i].id === e.value) {
        alert('Cannot add more')
        return newIngredients
      }
    }
    newIngredients[igd].ingredientId = e.value
    // newIngredients[igd].name = e.label
  }

  const handleQuantity = (e, igd) => {
    let newIngredients = [...ingredients]
    newIngredients[igd].quantity = e.target.value
  }

  const handleUnit = (e, igd) => {
    let newIngredients = [...ingredients]
    newIngredients[igd].unit_name = e.value
  }

  const handleDietAdd = e => {
    // console.log('e trong diet ne', ...e)
    let temp = []
    for (let i = 0; i < e.length; i++) {
      temp.push(e[i].value)
    }

    setDiets(temp)
  }

  const handleAddIngredient = () => {
    for (let i = 0; i < ingredients.length; i++) {
      if (
        ingredients[i].ingredientId === '' ||
        ingredients[i].quantity === '' ||
        ingredients[i].unit_name === ''
      ) {
        alert('Please fill in the empty field before create more')
        return
      }
    }
    setIngredients([
      ...ingredients,
      { ingredientId: '', quantity: 0, unit_name: `` }
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
    url: 'http://localhost:3000/recipe',
    headers: {
      Authorization: localStorage.accesstoken
    },
    data: {
      name: name,
      servingSize: servings,
      duration: duration + ' ' + durationUnits[1],
      imageLink: image,
      description: description,
      ingredients: ingredients,
      dietaryPrefs: diets,
      countryPrefs: [origin]
      // ingredients: ingredients.map(ele => {
      //   ingredientId:  ele.id,
      // })
    }
  }

  const handleCreateRecipe = async () => {
    // console.log('Access token ' + localStorage.accesstoken)
    try {
      const res = await axios.request(config)
      setMessage(res.data.message)
    } catch (error) {
      console.log(error)
    }

    // console.log('Collection id ' + props.collection.collection_id)
    // console.log('Recipe id ' + props.recipe.recipe_id)
    // handleBlur()
    // if (isSuccess) {
    //   console.log(message)
    // }

    // console.log('Collection id' + props.collection.collection_id)
    // console.log(props.recipe.recipe_id)
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // useEffect(() => {
    try {
      handleCreateRecipe()
      toggle()
      // refreshPage()
    } catch (error) {
      console.log(error)
    }

    // }, [])
  }

  return (
    // TODO add header and change page size
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
          btnFn={
            console.log('hello') // navigate('/', { replace: true })
            // handleSubmit
          }
        />
        <form className={styles.publish} onSubmit={handleSubmit}>
          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={`${styles.inputFieldContainer} ${styles.flexRow}`}>
              <label className={`${styles.fieldLabel}`}>Name</label>
              <input
                type="text"
                value={name}
                className={`${styles.inputField}`}
                onChange={e => setName(e.target.value)}
              />
            </div>
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
              {/* <DefaultButton
                fn={handleUploadImage}
                options={'Upload'}
                style={''}
                // className={styles.submitBtn}
              /> */}
              <div
                className={`${styles.uploadImageButton}`}
                onClick={handleUploadImage}
              >
                {/* <i className="fa-solid fa-image"></i> */}
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
              <img
                // className={`${styles.uploadImage}`}
                src={URL.createObjectURL(image)}
              />
            </div>
          ) : null}

          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={styles.title}>Description</div>
            <textarea
              className={`${styles.textArea}`}
              value={description}
              rows={12}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.oneline}>
            <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
              <div
                className={`${styles.inputFieldContainer} ${styles.flexRow}`}
              >
                {/* <label className={`${styles.fieldLabel}`}>Origin</label> */}
                <Select
                  className={`${styles.inputField} ${styles.select}`}
                  classNamePrefix="select"
                  options={countryOptions}
                  placeholder={`Recipe origin`}
                  onChange={e => handleAddOrigin(e)}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      width: '100%',
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
                    })
                  }}
                />
                {/* <input
                  className={`${styles.inputField}`}
                  type="text"
                  value={origin}
                  placeholder="Origins"
                  onChange={e => setOrigin(e.target.value)}
                /> */}
              </div>
            </div>
            <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
              <div
                className={`${styles.inputFieldContainer} ${styles.flexRow} ${styles.duration}`}
              >
                {/* <label className={`${styles.fieldLabel}`}>Duration</label> */}
                <input
                  className={`${styles.inputField}`}
                  type="number"
                  value={duration}
                  min={'1'}
                  placeholder="1"
                  onChange={e => setDuration(e.target.value)}
                />
                <span>{durationUnits[1]}</span>
              </div>
            </div>
            <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
              <div
                className={`${styles.inputFieldContainer} ${styles.flexRow}`}
              >
                {/* <label className={`${styles.fieldLabel}`}>Servings</label> */}
                <input
                  className={`${styles.inputField}`}
                  type="number"
                  min={'1'}
                  value={servings}
                  placeholder="Servings"
                  onChange={e => setServings(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.formControl} ${styles.boxShadowPurple} `}>
            <div className={`${styles.inputFieldContainer} ${styles.flexRow}`}>
              <label className={`${styles.fieldLabel}`}>
                Dietary preferences
              </label>
              {/* <input
                className={`${styles.inputField}`}
                type="text"
                // value={duration}
                min={'1'}
                placeholder="1"
                onChange={e => setDuration(e.target.value)}
              /> */}
              <Select
                className={`${styles.inputField} ${styles.select}`}
                classNamePrefix="select"
                isMulti
                options={dietOptions}
                // placeholder={``}
                onChange={e => handleDietAdd(e)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    width: '100%',
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
                      options={ingredientOPtion}
                      // onFocus={setIsFocus(true)}
                      placeholder={`Enter ingredient`}
                      onChange={e => handleIngredientChange(e, igd)}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: 'none',
                          width: '100%',
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
                          height: '160px',
                          overflow: 'auto',
                          display: 'flex'
                        })
                      }}
                    />

                    <input
                      type="number"
                      className={`${styles.inputField}`}
                      name="quantity"
                      min={0}
                      placeholder={0}
                      onChange={e => handleQuantity(e, igd)}
                      // autoComplete='on'
                    />
                    <Select
                      className={`${styles.inputField} ${styles.select}`}
                      classNamePrefix="select"
                      name={'ingre'}
                      options={unitOptions}
                      placeholder={'unit'}
                      onChange={e => handleUnit(e, igd)}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          // borderColor: state.isFocused ? '#ff8600' : '#ff8600',
                          // borderWidth: '2px',
                          border: 'none',
                          // borderRadius: '8px',
                          width: '100%',
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
                          height: '120px',
                          overflow: 'auto',
                          display: 'flex'

                          // position: 'fixed'
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
              // onChange={splice}
            >
              <i className="fa-solid fa-circle-plus"></i>
              <span> Add More Ingredients </span>
            </div>
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

export default PublishRecipe
