import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import { DefaultButton } from '../../Button'

const RenderLabel = props => {
  const style = {
    backgroundColor: props.color,
    color: props.textColor,
    backgroundColorHover: '',
    colorHover: props.color
  }

  return (
    <DefaultButton
      className={`${styles.label}`}
      type={'button'}
      key={props.key}
      style={style}
      fn={props.fn}
      options={props.name}
    ></DefaultButton>
  )
}

export default RenderLabel
