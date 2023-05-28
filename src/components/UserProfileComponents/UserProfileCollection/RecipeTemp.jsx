import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'

import { Suspense, lazy } from 'react'
import { FetchCollectionRecipe } from './FetchCollectionRecipe'

export const RecipeTemp = () => {
  const recipes = FetchCollectionRecipe(props.id)

  if (!recipes) {
    return <div>Loading...</div>
  }

  const Card = lazy(() => import('../../Card'))

  const recipe = recipes.map(ele => (
    <Card
      key={ele.recipe_id}
      image={ele.image_link}
      title={ele.name}
      category={['asd', 'asd1', 'asd2']}
      location="Downtown, Seattle WA"
      description={ele.description}
    />
  ))

  return (
    <div className={`${styles.collectionMainContainer}`}>
      <Suspense>{recipe}</Suspense>
    </div>
  )
}
