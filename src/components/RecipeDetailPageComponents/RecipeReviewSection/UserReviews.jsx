import ReactStars from 'react-rating-stars-component'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LoadUserImg } from '../../ApiPost/LoadImage'

const UserReview = props => {
  let star = {
    size: 20,
    count: 5,
    activeColor: 'rgba(254, 216, 53, 1)',
    edit: false,
    value: 0,
    isHalf: true
  }

  const [reviews, setReviews] = useState([])

  let config = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/${props.id}/reviews`
  }

  const fetch = async () => {
    try {
      const res = await axios.request(config)
      setReviews(res && res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  async function getImageURLs(reviews) {
    const imageUrls = []
    for (const review of reviews) {
      const userImgURL = await LoadUserImg(review.id)
      imageUrls.push(userImgURL)
    }
    return imageUrls
  }

  const [reviewImg, setReviewImg] = useState([]) // Fix the variable name

  // Usage example
  async function processReviews(reviews) {
    setReviewImg(await getImageURLs(reviews))
  }

  // console.log(reviewImg)

  useEffect(() => {
    processReviews(reviews).catch(error => {
      console.log(error)
    })
    // }
  }, [reviewImg])

  const userReview = reviews.map((review, id) => (
    <div
      key={review.review_id}
      className={`${styles.userReviewContainer} ${styles.boxShadowPurple}`}
    >
      <div className={`${styles.flexRow} ${styles.userInfoContainer}`}>
        <img className={`${styles.userAvatar}`} src={reviewImg[id]} />
        <div className={`${styles.flexColumm}`}>
          <div>{review.username}</div>
          <ReactStars {...star} value={review.rating} />
        </div>
      </div>
      <p className={`${styles.textOverFlowEcllipse}`}>{review.comment}</p>
    </div>
  ))

  return <>{userReview}</>
}

export default UserReview
