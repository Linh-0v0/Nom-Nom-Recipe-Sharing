import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'

import timeIcon from '../../../images/Nom nom icons/Time_atack.png'
import peopleIcon from '../../../images/Nom nom icons/User_alt_fill.png'
import { useState } from 'react'

const RecipeIntro = props => {
  const [imageURL, setImageURL] = useState(
    props.recipe.img || 'src/images/Default_img.svg'
  )
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    if (!imageError) {
      setImageURL('src/images/Default_img.svg')
      setImageError(true)
    }
  }

  if (props.recipe.commonInfo.dietType == null) {
    props.recipe.commonInfo.dietType = 'none'
  }

  // console.log('Dietary in common info', props.recipe.commonInfo.dietType)

  const dietary = props.recipe.commonInfo.dietType
    ? props.recipe.commonInfo.dietType.map((ele, id) => (
        <div
          key={id}
          className={styles.label}
          style={{ marginRight: '8px', padding: '4px', borderRadius: '8px' }}
        >
          {ele.name}
        </div>
      ))
    : null

  return (
    <div
      className={`${styles.recipePrimaryContainer} ${styles.boxShadowPurple}`}
    >
      <img
        className={styles.recipeImg}
        alt={`${props.recipe.title} img`}
        src={imageURL}
        onError={handleImageError}
      />
      <div className={styles.title}>{props.recipe.title}</div>
      <div className={styles.commonInfo}>
        <div className={`${styles.commonInfoEle} ${styles.flexRow}`}>
          <i className="fa-solid fa-clock"></i>
          <div>{props.recipe.commonInfo.duration}</div>
        </div>
        <div className={`${styles.commonInfoEle} ${styles.flexRow}`}>
          <i className="fa-solid fa-user"></i>

          <div
          // onMouseUp={e => {
          //   console.log('hello')
          //   handleChange(e)
          // }}
          >
            <input
              type="number"
              min={1}
              defaultValue={parseInt(props.recipe.commonInfo.serving)}
              // value={parseInt(props.recipe.commonInfo.serving)}
              // placeholder={parseInt(props.recipe.commonInfo.serving)}
              onChange={e => props.handleChange(e)}
              style={{
                width: '60px',
                borderStyle: 'none',
                backgroundColor: 'whitesmoke',
                height: '20px',
                margin: '0',
                border: '0',
                outline: 'none',
                padding: '0 0 0 8px',
                textAlign: 'right'
              }}
            />{' '}
            people
          </div>
          {/* <div><input type='number' min={1} value={props.currentSize} onChange={e => props.setCurrentSize(e)}/>{props.recipe.commonInfo.serving} people</div> */}
        </div>
        {/* <div className={`${styles.commonInfoEle} ${styles.flexRow}`}>
          <div>
            <b>Calories</b>: {props.recipe.commonInfo.calories}
          </div>
        </div> */}
        <div className={`${styles.commonInfoEle} ${styles.flexRow}`}>
          <div>
            <b>Diet type</b>: {dietary}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeIntro
