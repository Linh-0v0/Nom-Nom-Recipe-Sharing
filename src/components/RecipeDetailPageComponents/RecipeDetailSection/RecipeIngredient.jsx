
import RenderLabel from "./RenderLabel"
import RenderDetail from "./RenderDetail"
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'



const RecipeIngredient = (props) => {
    
    // const label = labelProps.map((ele) => RenderLabel(ele))

    const label = props.recipe.ingredients.map((ele) => 
      RenderLabel(ele))

  
      
    const labelDetail = props.recipe.ingredients.map(ele => RenderDetail(ele))

    // const nutrition = nutritionFacts.map((ele) => RenderDetail(ele))
  
    return (
      <div className={`${styles.ingredientContainer} ${styles.flexRow} `}>
        <div className={`${styles.ingredientTab} ${styles.boxShadowPurple}`}>
          <div className={styles.labelContainer}>
            {label}
          </div>
          <div className={styles.ingDetailContainer}>{labelDetail}</div>
        </div>
  
        <div className={`${styles.ingredientTab} ${styles.boxShadowPurple}`}>
          <div className={styles.title}>Nutrition facts</div>
          {/* <div className={styles.ingDetailContainer}>{temp}</div> */}
        </div>
      </div>
    )
  }

  export default RecipeIngredient;