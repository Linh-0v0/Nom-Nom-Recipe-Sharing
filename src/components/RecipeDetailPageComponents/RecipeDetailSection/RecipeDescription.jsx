
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'

const RecipeDescription = (props) => {



    return (
      <>
        <div className={`${styles.recipePrimaryContainer} ${styles.boxShadowPurple}`}>
          <div className={styles.title}>Origin</div>
          <p>
            {props.recipe.origin}
          </p>
        </div>
        <div className={`${styles.recipePrimaryContainer} ${styles.boxShadowPurple}`}>
          <div className={styles.title}>Description</div>
          <p>
            {props.recipe.description}
          </p>
        </div>
        
      </>
      
    )
  }

  export default RecipeDescription;