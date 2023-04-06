import RecipeIntro from "./RecipeIntro";
import RecipeIngredient from "./RecipeIngredient";
import RecipeDescription from "./RecipeDescription";
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import image from '../../../images/recipeImage.png'

const RecipeDetail = () => {

  const recipe = {
    title: 'Beef steak',
    img: image,
    commonInfo: {
      duration: "40 minutes",
      serving: "1 people",
      calories: "600 kcal",
      dietType: ""
    },
    origin: "france",
    description: "lorem ipsum",
    ingredients: [
      { key: 1, name: 'Beef', color: 'red', textColor: 'white', amount: '200g'},
      { key: 2, name: 'Pepper', color: 'black', textColor: 'white', amount: '1g' },
      { key: 3, name: 'Potato', color: 'Yellow', textColor: 'black', amount: '1' }
    ]
  }

    return (
      <div className={`${styles.recipePrimaryContainer} ${styles.flexColumn}`}>
        <RecipeIntro recipe={recipe}/>
        <RecipeDescription recipe={recipe}/>
        <RecipeIngredient recipe={recipe}/>
      </div>
    )
  }

  export default RecipeDetail;