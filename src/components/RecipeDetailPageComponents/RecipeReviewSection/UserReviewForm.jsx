import { useEffect, useState } from 'react'
import styles from '../../../styles/RecipeDetailPage/UserReviewForm.module.css'
import ReactStars from 'react-rating-stars-component'
import { UpdateButton } from '../../UserProfileComponents/UpdateProfileButton'
import axios from 'axios'
import useModal from '../../ModalComponents/useModal'
import Modal from '../../ModalComponents/Modal'

export const UserReviewForm = id => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const { isShowing, toggle } = useModal()

  const handleChange = newRating => {
    setRating(newRating)
  }

  let star = {
    size: 20,
    count: 5,
    activeColor: 'rgba(254, 216, 53, 1)',
    edit: true,
    value: rating,
    isHalf: true
  }

  let config = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/${id.id}/reviews`,
    headers: {
      Authorization: localStorage.accesstoken
    },
    data: {
      rating: rating,
      comment: comment
    }
  }

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.request(config)

      setMessage(res.data.message)

      toggle()
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   handleSubmit()
  // }, [])

  return (
    <form
      className={`${styles.userReviewContainer} ${styles.flexColumn} ${styles.boxShadowPurple}`}
    >
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={''}
        modalMsg={message}
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={() => {
          refreshPage()
        }}
      />
      <div className={`${styles.ratingContainer}`}>
        <ReactStars {...star} onChange={handleChange}></ReactStars>
      </div>
      <div className={`${styles.commentContainer}`}>
        <textarea
          placeholder="Leave a comment here"
          cols={4}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>
      <UpdateButton option={'post'} fn={handleSubmit} />
    </form>
  )
}
