import { useState, useEffect } from 'react'
import axios from 'axios'

export const FetchRecipeByID = id => {
  const [recipe, setRecipe] = useState()
  const [dietary, setDietary] = useState([])

  let configRecipe = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/${id}`
  }

  let configDietary = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/get-dietary/${id}`
  }

  const fetch = async () => {
    try {
      const res = await axios
        .all([axios.request(configRecipe), axios.request(configDietary)])
        .then(
          axios.spread((resRecipe, resDietary) => {
            setRecipe(resRecipe.data)
            setDietary(resDietary.data)
          })
        )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return { recipe, dietary }
}
