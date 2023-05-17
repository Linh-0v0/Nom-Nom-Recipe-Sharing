import RecipeIntro from './RecipeIntro'
import RecipeIngredient from './RecipeIngredient'
import RecipeDescription from './RecipeDescription'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import image from '../../../images/recipeImage.png'
import axios from 'axios'
import { useEffect, useRef, useState, useTransition } from 'react'
import { FetchIngAndNutri } from '../../Fetch/Recipes/FetchIngAndNutri'

const RecipeDetail = props => {
  // const duration = Object.entries(props.recipe.duration)

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
    img: props.recipe.image_link,
    commonInfo: {
      duration: duration,
      serving: parseInt(props.recipe.serving_size),
      // calories: `${props.nutritions.calories}`,
      dietType: Array.from(props.dietary)
    },
    origin: 'france',
    description: props.recipe.description
  }

  const [currentSize, setCurrentSize] = useState(
    // recipe.serving ? recipe.serving : ''
    parseInt(props.recipe.serving_size)
  )

  const ref = useRef(parseInt(props.recipe.serving_size))

  // const { ingredients, nutritions } = FetchIngAndNutri(props.id, currentSize)

  const [ingredientsTmp, setIngredients] = useState('')
  const [nutritionsTmp, setNutritions] = useState('')

  let configIng = {
    method: 'post',
    url: `http://localhost:3000/recipe/nutritions/total-ing-nutrition-facts/${props.id}`,
    data: {
      servingNum: `${ref.current}`
    }
  }

  let configNutrition = {
    method: 'post',
    url: `http://localhost:3000/recipe/nutritions/total-nutrition-facts/${props.id}`,
    data: {
      servingNum: `${ref.current}`
    }
  }

  useEffect(() => {
    axios.all([axios.request(configIng), axios.request(configNutrition)]).then(
      axios.spread((resIng, resNutri) => {
        // console.log('ing ', resIng, 'Nug ', resNutri)
        setIngredients(resIng && resIng.data.ingredientFactsOfRecipe)
        setNutritions(resNutri && resNutri.data.ingredientFactsOfRecipe[0])
      })
    )
  }, [])

  // console.log('Current size', props.servingNum)
  const handleChange = event => {
    // setCurrentSize(event.target.value / props.recipe.serving_size)
    // ref.current = currentSize

    ref.current = event.target.value / props.recipe.serving_size

    console.log('cai ref ne', ref.current.valueOf)
    let configIng = {
      method: 'post',
      url: `http://localhost:3000/recipe/nutritions/total-ing-nutrition-facts/${props.id}`,
      data: {
        servingNum: `${ref.current}`
      }
    }

    let configNutrition = {
      method: 'post',
      url: `http://localhost:3000/recipe/nutritions/total-nutrition-facts/${props.id}`,
      data: {
        servingNum: `${ref.current}`
      }
    }
    axios.all([axios.request(configIng), axios.request(configNutrition)]).then(
      axios.spread((resIng, resNutri) => {
        // console.log('ing ', resIng, 'Nug ', resNutri)
        setIngredients(resIng && resIng.data.ingredientFactsOfRecipe)
        setNutritions(resNutri && resNutri.data.ingredientFactsOfRecipe[0])
      })
    )
  }

  console.log('ingredients ne', ingredientsTmp)

  return (
    <div
      className={`${styles.recipePrimaryContainer} ${styles.flexColumn} ${styles.recipeDetailMainContainer}`}
    >
      <RecipeIntro
        recipe={recipe}
        setCurrentSize={setCurrentSize}
        // changeEle={changeEle}
        handleChange={handleChange}
        // click={click}
      />
      <RecipeDescription
        recipe={recipe}
        id={props.id}
        // nutritions={props.nutritions}
      />
      <RecipeIngredient
        recipe={recipe}
        servingSize={props.recipe.serving_size}
        servingNum={currentSize}
        // changeEle={changeEle}
        id={props.id}
        // handleChange={handleChange}
        // setCurrentSize={setCurrentSize}
        // ref={ref}
        ingredientsTmp={ingredientsTmp}
        nutritionsTmp={nutritionsTmp}
      />
    </div>
  )
}

export default RecipeDetail
