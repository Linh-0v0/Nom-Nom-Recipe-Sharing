import { DefaultButton } from '../Button'
import styles from '../../styles/RecipeDetailPage/DetailRecipePage.module.css'

export const RenderProfileSection = (current, setSection) => {
  const style = {
    backgroundColor: ' #3d233a',
    color: 'white',
    backgroundColorHover: '',
    colorHover: ' #3d233a'
  }
  const handleClick = () => {
    setSection()
  }

  return (
    <DefaultButton
      className={`${styles.label}`}
      type={'button'}
      key={current.key}
      style={style}
      fn={handleClick}
      options={current.name}
    ></DefaultButton>
  )
}
