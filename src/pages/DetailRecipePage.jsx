import Header from '../components/Header'
import styles from '../styles/RecipeDetailPage/DetailRecipePage.module.css'
import RecipeDetail from '../components/RecipeDetailPageComponents/RecipeDetailSection/RecipeDetail'
import RecipeReview from '../components/RecipeDetailPageComponents/RecipeReviewSection/RecipeReview'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FetchRecipeByID } from '../components/Fetch/Recipes/FetchRecipeByID'
import { useParams } from 'react-router-dom'
import { FetchIngAndNutri } from '../components/Fetch/Recipes/FetchIngAndNutri'
import StickyBox from 'react-sticky-box'

// import { LLogin } from '../components/Login'

const DetailRecipePage = () => {
  const { id } = useParams()

  const { recipe, dietary } = FetchRecipeByID(id)

  // console.log('recipe ne', recipe)

  // console.log('Troi oi recipe ne', recipe)

  console.log('cai recipe ne', recipe, dietary)
  return (
    <>
      {/* TODO CSS clashes with PublicRecipe.module.css page [FIX] */}
      <Header />
      <div className={`${styles.body}`}>
        <div
          className={`${styles.mainContainer} ${styles.flexRow}`}
          style={{ display: 'flex', alignItems: 'flex-start' }}
        >
          <RecipeDetail id={id} recipe={recipe} dietary={dietary} />

          <StickyBox offsetTop={20} offsetBottom={20} style={{ width: '30%' }}>
            <RecipeReview recipe={recipe} id={id} />
          </StickyBox>
        </div>
      </div>
    </>
  )
}

export default DetailRecipePage
