import Header from '../components/Header'
import styles from '../styles/RecipeDetailPage/DetailRecipePage.module.css'
// import RecipeDetail from '../components/RecipeDetailPageComponents/RecipeDetailSection/RecipeDetail'
import { RecipeReview } from '../components/RecipeDetailPageComponents/RecipeReviewSection/RecipeReview'
import { FetchRecipeByID } from '../components/ApiFetch/Recipes/FetchRecipeByID.jsx'
import { useParams } from 'react-router-dom'
import StickyBox from 'react-sticky-box'
import { RecipeDetail } from '../components/RecipeDetailPageComponents/RecipeDetailSection/RecipeDetail'

const DetailRecipePage = () => {
  const { id } = useParams()

  const { recipe, dietary } = FetchRecipeByID(id)

  return (
    <>
      <Header />
      <div className={`${styles.body}`}>
        <div
          className={`${styles.mainContainer} ${styles.flexRow}`}
          style={{ display: 'flex', alignItems: 'flex-start' }}
        >
          <RecipeDetail id={id} recipe={recipe} dietary={dietary} />

          <StickyBox offsetTop={20} offsetBottom={20} style={{ width: '30%' }}>
            <RecipeReview recipe={recipe} id={id} />
          </StickyBox>
        </div>
      </div>
    </>
  )
}

export default DetailRecipePage
