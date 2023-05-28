import axios from 'axios'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import { useEffect, useState } from 'react'

const RecipeIngredient = props => {
  if (!props.nutritionsTmp && !props.ingredientsTmp) {
    return <div> loading...</div>
  }

  let nutritionToArr = Object.entries(props.nutritionsTmp)

  for (let nutrition of nutritionToArr) {
    if (nutrition[0].includes('_')) {
      nutrition[0] = nutrition[0].replace('_', ' ')
    }
  }

  const label = props.ingredientsTmp
    ? props.ingredientsTmp.map(ele => (
        <div key={ele.id} className={styles.label}>
          {ele.ing_name}
        </div>
      ))
    : null

  const labelDetail = props.ingredientsTmp
    ? props.ingredientsTmp.map(ele => (
        <div
          key={ele.id}
          className={`${styles.eleContainer} ${styles.flexRow}`}
        >
          <i className="fa-solid fa-check"></i>
          <div>{ele.ing_name}</div>
          <div>{ele.quantity}</div>
          <div>{ele.unit_name}</div>
        </div>
      ))
    : null

  const nutrition = nutritionToArr.map((ele, index) => (
    <div key={index} className={`${styles.eleContainer} ${styles.flexRow}`}>
      <i className="fa-solid fa-check"></i>
      <div>{ele[0]}</div>
      <div>{Math.round(ele[1] * 100) / 100}</div>
    </div>
  ))

  return (
    <>
      <div
        className={`${styles.ingredientContainer} ${styles.flexRow}  ${styles.boxShadowPurple} `}
      >
        <div className={`${styles.ingredientTab} `}>
          <div className={styles.labelContainer}>{label}</div>
          <div className={styles.ingDetailContainer}>{labelDetail}</div>
        </div>

        <div className={`${styles.ingredientTab}`}>
          <div className={styles.title}>Nutrition facts</div>
          <div
            className={`${styles.ingDetailContainer} ${styles.nutritionDetail}`}
          >
            {nutrition}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeIngredient
