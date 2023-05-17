import { useState, useEffect } from 'react'
import axios from 'axios'

export const FetchRecipeByID = id => {
  const [recipe, setRecipe] = useState()
  const [dietary, setDietary] = useState([])
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

  let configDietary = {
    method: 'GET',
    url: `http://localhost:3000/recipe/get-dietary/${id}`
  }

  const fetch = async () => {
    try {
      const res = await axios
        .all([axios.request(configRecipe), axios.request(configDietary)])
        .then(
          axios.spread((resRecipe, resDietary) => {
            setRecipe(resRecipe && resRecipe.data)
            setDietary(resDietary && resDietary.data)
          })
        )
    } catch (error) {
      console.log(error)
    }
  }

  // try {
  //   const res = axios
  //     .all([axios.request(configRecipe), axios.request(configDietary)])
  //     .then(
  //       axios.spread((resRecipe, resDietary) => {
  //         setRecipe(resRecipe && resRecipe.data)
  //         setDietary(resDietary && resDietary.data)
  //       })
  //     )
  // } catch (error) {
  //   console.log(error)
  // }

  // const fetch = async () => {
  //   try {
  //     const res = await axios.request(configRecipe)
  //     setRecipe(res.data)
  //     setServingNum(res.data.serving_size)
  //     setIsLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    fetch()
  }, [])

  return { recipe, dietary }
  // return { recipe }
}
