import axios from 'axios'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import { FetchIngAndNutri } from '../../Fetch/Recipes/FetchIngAndNutri'
import { useEffect, useState } from 'react'

const RecipeIngredient = props => {
  // const { ingredients, nutritions } = FetchIngAndNutri(
  //   props.id,
  //   props.servingNum
  // )

  // const [ingredientsTmp, setIngredients] = useState(ingredients)
  // const [nutritionsTmp, setNutritions] = useState(nutritions)

  // console.log('Current size', props.servingNum)
  // const handleChange = event => {
  //   let configIng = {
  //     method: 'post',
  //     url: `http://localhost:3000/recipe/nutritions/total-ing-nutrition-facts/${props.id}`,
  //     data: {
  //       servingNum: `${props.servingNum}`
  //     }
  //   }

  //   let configNutrition = {
  //     method: 'post',
  //     url: `http://localhost:3000/recipe/nutritions/total-nutrition-facts/${props.id}`,
  //     data: {
  //       servingNum: `${props.servingNum}`
  //     }
  //   }

  //   console.log(props.servingNum)

  //   axios.all([axios.request(configIng), axios.request(configNutrition)]).then(
  //     axios.spread((resIng, resNutri) => {
  //       // console.log('ing ', resIng, 'Nug ', resNutri)
  //       setIngredients(resIng && resIng.data.ingredientFactsOfRecipe)
  //       setNutritions(resNutri && resNutri.data.ingredientFactsOfRecipe[0])
  //     })
  //   )
  // }

  if (!props.nutritionsTmp && !props.ingredientsTmp) {
    return <div> loading...</div>
  }

  console.log('hello', props.servingNum)

  let nutritionToArr = Object.entries(props.nutritionsTmp)

  for (let i = 0; i < nutritionToArr.length; i++) {
    if (nutritionToArr[i][0].includes('_')) {
      nutritionToArr[i][0] = nutritionToArr[i][0].replace('_', ' ')
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
          <i class="fa-solid fa-check"></i>
          <div>{ele.ing_name}</div>
          <div>{ele.quantity}</div>
          <div>{ele.unit_name}</div>
        </div>
      ))
    : null

  const nutrition = nutritionToArr.map((ele, index) => (
    <div key={index} className={`${styles.eleContainer} ${styles.flexRow}`}>
      <i class="fa-solid fa-check"></i>
      <div>{ele[0]}</div>
      <div>{Math.round(ele[1] * 100) / 100}</div>
    </div>
  ))

  return (
    <>
      <div
        className={`${styles.ingredientContainer} ${styles.flexRow}  ${styles.boxShadowPurple} `}
        // onChange={handleChange}
        // ref={props.ref}
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

{
}

export default RecipeIngredient
