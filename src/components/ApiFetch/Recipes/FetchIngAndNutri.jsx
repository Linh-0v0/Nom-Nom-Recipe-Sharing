import { useState, useEffect } from 'react'
import axios from 'axios'

export const FetchIngAndNutri = (id, servingNum) => {
  const [ingredients, setIngredients] = useState([])
  const [nutritions, setNutritions] = useState([])

  let configIng = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/nutritions/total-ing-nutrition-facts/${id}`,
    data: {
      servingNum: servingNum
    }
  }

  let configNutrition = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/nutritions/total-nutrition-facts/${id}`,
    data: {
      servingNum: servingNum
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

  return { ingredients, nutritions }
}
