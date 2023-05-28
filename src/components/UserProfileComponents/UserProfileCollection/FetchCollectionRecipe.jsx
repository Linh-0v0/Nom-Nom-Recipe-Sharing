import axios from 'axios'
import { useEffect, useState } from 'react'

export const FetchCollectionRecipe = id => {
  let config = {
    method: 'get',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/collection/${id}/recipes`,
    headers: {
      Authorization: localStorage.accesstoken
    }
  }
  const [recipes, setRecipes] = useState()

  useEffect(() => {
    axios
      .request(config)
      .then(res => setRecipes(res.data))
      .catch(error => console.log(error))
  }, [])
  return recipes
}
