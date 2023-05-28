import { useEffect, useState } from 'react'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import axios from 'axios'

const RecipeDescription = props => {
  let config = {
    method: 'get',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/get-origin/${props.id}`
  }

  const [origins, setOrigins] = useState([])

  useEffect(() => {
    axios
      .request(config)
      .then(res => setOrigins(res.data))
      .catch(error => console.log(error))
  }, [])

  const origin = origins.map(ele => <p key={ele.id}>{ele.name}</p>)

  return (
    <>
      <div
        className={`${styles.recipePrimaryContainer} ${styles.boxShadowPurple}`}
      >
        <div className={styles.title}>Origin</div>
        <div className={styles.originContainer}>{origin}</div>
      </div>
      <div
        className={`${styles.recipePrimaryContainer} ${styles.boxShadowPurple}`}
      >
        <div className={styles.title}>Description</div>
        <p className={`${styles.description}`}>{props.recipe.description}</p>
      </div>
    </>
  )
}

export default RecipeDescription
