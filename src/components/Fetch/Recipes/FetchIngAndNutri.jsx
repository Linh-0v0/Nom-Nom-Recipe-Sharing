import { useState, useEffect } from 'react'
import axios from 'axios'

export const FetchIngAndNutri = (id, servingNum) => {
  const [ingredients, setIngredients] = useState([])
  const [nutritions, setNutritions] = useState([])

  console.log('serving ne', servingNum)

  let configIng = {
    method: 'post',
    url: `http://localhost:3000/recipe/nutritions/total-ing-nutrition-facts/${id}`,
    data: {
      servingNum: servingNum
    }
  }

  let configNutrition = {
    method: 'post',
    url: `http://localhost:3000/recipe/nutritions/total-nutrition-facts/${id}`,
    data: {
      servingNum: servingNum
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

  // console.log('log choi choi cai ing', ingredients)

  // try {
  //   const [ingData, nutriData] = await axios.all([
  //     axios.request(configIng),
  //     axios.request(configNutrition)
  //   ])
  //   return {
  //     ingredients: ingData.data.ingredientFactsOfRecipe,
  //     nutritions: nutriData.data.ingredientFactsOfRecipe[0]
  //   }
  // } catch (error) {
  //   console.error(error)
  // }
  return { ingredients, nutritions }
}
