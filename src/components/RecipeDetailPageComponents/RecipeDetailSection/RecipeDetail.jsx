import RecipeIntro from './RecipeIntro'
import RecipeIngredient from './RecipeIngredient'
import RecipeDescription from './RecipeDescription'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

export const RecipeDetail = props => {
  if (!props.recipe) {
    return <div>Loading data....</div>
  }

  let duration = Object.entries(props.recipe.duration).map(
    ([key, val] = entry) => {
      return `${val} ${key}`
    }
  )

  const recipe = {
    id: props.id,
    title: props.recipe.name,
    img: props.recipe.image_link || '/images/Default_img.svg',
    commonInfo: {
      duration: duration,
      serving: parseInt(props.recipe.serving_size),
      dietType: Array.from(props.dietary)
    },
    servingUnit: props.recipe.serving_unit,
    origin: 'france',
    description: props.recipe.description
  }

  const [currentSize, setCurrentSize] = useState(
    parseInt(props.recipe.serving_size)
  )

  const ref = useRef(
    parseInt(props.recipe.serving_size) / parseInt(props.recipe.serving_size)
  )

  const [ingredientsTmp, setIngredients] = useState('')
  const [nutritionsTmp, setNutritions] = useState('')

  let configIng = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/nutritions/total-ing-nutrition-facts/${props.id}`,
    data: {
      servingNum: `${ref.current}`
    }
  }

  let configNutrition = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/nutritions/total-nutrition-facts/${props.id}`,
    data: {
      servingNum: `${ref.current}`
    }
  }

  useEffect(() => {
    axios.all([axios.request(configIng), axios.request(configNutrition)]).then(
      axios.spread((resIng, resNutri) => {
        setIngredients(resIng.data.ingredientFactsOfRecipe)
        setNutritions(resNutri.data.ingredientFactsOfRecipe[0])
      })
    )
  }, [])

  // useEffect(() => {
  //   axios
  //     .all([
  //       axios
  //         .request(configIng)
  //         .then(res => {
  //           setIngredients(res.data.ingredientFactsOfRecipe)
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         }),
  //       axios
  //         .request(configNutrition)
  //         .then(res => {
  //           setNutritions(res.data.ingredientFactsOfRecipe[0])
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     ])
  //     .catch(error => {
  //       console.log(error)
  //     })
  // .then(
  //   axios.spread((resIng, resNutri) => {
  //     setIngredients(resIng.data.ingredientFactsOfRecipe)
  //     setNutritions(resNutri.data.ingredientFactsOfRecipe[0])
  //   })
  // )
  // }, [])

  const handleChange = async event => {
    ref.current = event.target.value / props.recipe.serving_size

    let configIng = {
      method: 'post',
      url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/nutritions/total-ing-nutrition-facts/${props.id}`,
      data: {
        servingNum: `${ref.current}`
      }
    }

    let configNutrition = {
      method: 'post',
      url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/nutritions/total-nutrition-facts/${props.id}`,
      data: {
        servingNum: `${ref.current}`
      }
    }

    axios.all([axios.request(configIng), axios.request(configNutrition)]).then(
      axios.spread((resIng, resNutri) => {
        setIngredients(resIng.data.ingredientFactsOfRecipe)
        setNutritions(resNutri.data.ingredientFactsOfRecipe[0])
      })
    )
  }

  return (
    <div
      className={`${styles.recipePrimaryContainer} ${styles.flexColumn} ${styles.recipeDetailMainContainer} ${styles.boxShadowPurple}`}
    >
      <RecipeIntro
        recipe={recipe}
        setCurrentSize={setCurrentSize}
        handleChange={handleChange}
      />
      <RecipeDescription recipe={recipe} id={props.id} />
      <RecipeIngredient
        recipe={recipe}
        servingSize={props.recipe.serving_size}
        servingNum={currentSize}
        id={props.id}
        ingredientsTmp={ingredientsTmp}
        nutritionsTmp={nutritionsTmp}
      />
    </div>
  )
}

// export default RecipeDetail
