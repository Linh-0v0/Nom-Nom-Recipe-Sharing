import styles from '../styles/Card.module.css'
import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from './SessionVerification/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

const fetchRecipeImg = async recipe_id => {
  try {
    const response = await axios.get(
      `https://nom-nom-recipe-web-be.herokuapp.com/recipe/get-img/${recipe_id}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    return '/images/Default_img.svg'
  }
}

function CardImage (props) {
  const [imageURL, setImageURL] = useState('/images/Default_img.svg')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await fetchRecipeImg(props.recipe_id)
        setImageURL(image || '/images/Default_img.svg')
      } catch (error) {
        console.log(error)
        setImageError(true)
      }
    }

    fetchImage()
  }, [props.recipe_id])

  const handleImageError = () => {
    if (!imageError) {
      setImageURL('/images/Default_img.svg')
      setImageError(true)
    }
  }

  const imageStyle = {
    width: imageURL !== '/images/Default_img.svg' ? '100%' : '200px',
    objectFit: 'cover'
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div className={styles.Image} style={containerStyle}>
      <img
        style={imageStyle}
        src={imageURL}
        alt="Seattle"
        loading="lazy"
        onError={handleImageError}
      />
    </div>
  )
}

function UpdateRecipeButton ({ userID, fn }) {
  const { userData } = useContext(AuthContext)

  if (userID == userData.user.id) {
    return (
      <button onClick={fn} className={`${styles.updateButton}`}>
        Update
      </button>
    )
  }
  return null
}

const fetchCountryForRecipe = async recipe_id => {
  try {
    const response = await axios.get(
      `https://nom-nom-recipe-web-be.herokuapp.com/recipe/get-origin/${recipe_id}`
    )
    const countries = response.data.map(item => item.name)
    return countries
  } catch (error) {
    console.log(error)
    return []
  }
}

function CardContent (props) {
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchCountryForRecipe(props.recipe_id)
        setCategories(categories)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategories()
  }, [props.recipe_id])

  return (
    <div className={styles.CardContent}>
      <p className={styles.CardTitle}>{props.title}</p>
      {categories.map((location, index) => (
        <span key={index} className={styles.LocationLabel}>
          {location}
        </span>
      ))}
      <p className={`${styles.tooltip} ${styles.Description}`}>
        {props.description}
      </p>
    </div>
  )
}

export default class Card extends React.Component {
  render () {
    return (
      <div className={styles.Card}>
        <div>
          <CardImage
            recipe_id={this.props.recipe_id}
            width={this.props.width}
          />
          <CardContent
            recipe_id={this.props.recipe_id}
            title={this.props.title}
            location={this.props.location}
            description={this.props.description}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.seeMoreButton} onClick={this.props.fn2}>
            See More
          </button>
          <UpdateRecipeButton fn={this.props.fn} userID={this.props.userID} />
        </div>
      </div>
    )
  }
}

Card.defaultProps = {
  fn: '',
  title: 'Template - Card Title',
  location: ['asd', 'asd1', 'asd2'],
  description: 'Template description textbox'
}
