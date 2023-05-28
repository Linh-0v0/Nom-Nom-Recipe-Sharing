import doneIcon from '/images/Nom nom icons/Done.png'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'

const RenderDetail = props => {
  return (
    <div key={props.key} className={`${styles.eleContainer} ${styles.flexRow}`}>
      <img src={doneIcon} />
      <div>{props.name}</div>
      <div>{props.amount}</div>
    </div>
  )
}
export default RenderDetail
