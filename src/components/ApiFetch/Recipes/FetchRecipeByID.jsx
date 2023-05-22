import { useState, useEffect } from 'react'
import axios from 'axios'

export const FetchRecipeByID = id => {
  const [recipe, setRecipe] = useState()
  // const [ingredients, setIngredients] = useState([])
  // const [nutritions, setNutritions] = useState([])
  // const [servingNum, setServingNum] = useState('')
  // const [isLoading, setIsLoading] = useState(true)
  // const [ingredients, setIngredients] = useState([])

  // const [nutritions, setNutritions] = useState([])

  let configRecipe = {
    method: 'GET',
    url: `http://localhost:3000/recipe/${id}`
  }

  const fetchRecipe = async () => {
    try {
      const res = await axios.request(configRecipe)
      setRecipe(res.data)
      setServingNum(res.data.serving_size)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  return { recipe }
}
