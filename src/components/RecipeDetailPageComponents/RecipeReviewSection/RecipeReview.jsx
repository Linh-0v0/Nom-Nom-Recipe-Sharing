import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import SaveRecipeButton from './SaveRecipeButton'
import CollectionDropList from '../../UserProfileComponents/UserProfileCollection/UserCollectionDrop/CollectionDropList'
import UserReview from './UserReviews'
import { useEffect, useState } from 'react'
import ClickChangeStyle from '../../ClickChangeStyle'
import { UserReviewForm } from './UserReviewForm'
import SocialMediaButton from '../../SocialMediaButton/SocialMediaButton'
import { Link, useLocation } from 'react-router-dom'

export const RecipeReview = props => {
  const styleElement = {
    default: 'none',
    change: 'block'
  }
  const [current, setCurrent] = useState('none')

  const handleClick = () => {
    let newStyle
    if (current == styleElement.default) {
      newStyle = styleElement.change
    }
    setCurrent(newStyle)
  }

  const [link, setLink] = useState('')

  useEffect(() => {
    // setLink(`${window.location.origin}${window.location.pathname}`)
    setLink(window.location.href)
  }, [])

  return (
    <div
      className={`${styles.recipePrimaryContainer} ${styles.flexColumn} ${styles.boxShadowPurple} ${styles.reviewsContainer}`}
    >
      <div className={`${styles.labelContainer} ${styles.temp}`}>
        <SaveRecipeButton fn={handleClick}></SaveRecipeButton>
        <CollectionDropList
          setCurrent={setCurrent}
          style={styleElement}
          recipe={props.recipe}
          current={current}
          id={props.id}
        ></CollectionDropList>
        <SocialMediaButton link={link} />
      </div>
      <UserReviewForm id={props.id} />
      <UserReview id={props.id}></UserReview>
    </div>
  )
}
// export default RecipeReview
