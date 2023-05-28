import { useState } from 'react'

export const FetchRecipeWithName = name => {
  let config = {
    method: 'get',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/name/${name}`
  }

  const [recipe, setRecipe] = useState([])
}
