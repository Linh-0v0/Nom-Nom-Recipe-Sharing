import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import { DefaultButton } from '../../Button'

const SaveRecipeButton = props => {
  const style = {
    backgroundColor: 'green',
    color: 'white',
    backgroundColorHover: '',
    colorHover: 'green'
  }

  return (
    <DefaultButton
      className={`${styles.label} ${styles.save} ${styles.boxShadowPurple}`}
      type={'button'}
      style={style}
      fn={props.fn}
      options={'Save to collection'}
    ></DefaultButton>
  )
}

export default SaveRecipeButton
