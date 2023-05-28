import { useState } from 'react'
import styles from '../../../styles/RecipeDetailPage/DetailRecipePage.module.css'
import { RenderProfileSection } from '../RenderProfileSection'
import { RecipeSection } from '../UserProfileRecipe/RecipeSection'
import { DefaultButton } from '../../Button'

export const UserProfileTab = props => {
  const style = {
    backgroundColor: ' #3d233a',
    color: 'white',
    backgroundColorHover: '',
    colorHover: ' #3d233a'
  }

  const handleClick = () => {
    let newDisplay = {
      collection: '',
      recipe: ''
    }
    if (props.id == 2) {
      newDisplay = {
        collection: 'none',
        recipe: 'flex'
      }
    } else {
      newDisplay = {
        collection: 'flex',
        recipe: 'none'
      }
    }

    props.setDisplay(newDisplay)
  }

  return (
    <DefaultButton
      className={`${styles.label}`}
      type={'button'}
      key={''}
      style={style}
      fn={handleClick}
      options={props.name}
    ></DefaultButton>
  )
}
