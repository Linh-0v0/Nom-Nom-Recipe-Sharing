import React, { useState, useEffect, Suspense } from 'react'

import styles from '../../styles/LandingPage/Feed.module.css'
import { useContext } from 'react'
import { AuthContext } from '../SessionVerification/AuthContext'
import { Link } from 'react-router-dom'
import StickyBox from 'react-sticky-box'
import { BackToTopButton, Button2 } from '../Button'
import { useNavigate } from 'react-router-dom'

export default function Feed () {
  const navigate = useNavigate()

  const { userData } = useContext(AuthContext)

  const [feedData, setFeedData] = useState([])

  const [isDietNull, setIsDietNull] = useState(null)

  const { dietData } = useContext(AuthContext)
  useEffect(() => {
    if (dietData != null) {
      if (dietData.msg.length === 0) {
        setIsDietNull(true)
      } else {
        setIsDietNull(false)
      }
    }
  }, [dietData, isDietNull])

  async function fetchRecommendationsByDietary (userID) {
    const url = `https://nom-nom-recipe-web-be.herokuapp.com/recipe/recommendations/dietary/${userID}`
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()

        const mergedData = Object.values(
          data.data.reduce((merged, item) => {
            if (!merged[item.recipe_id]) {
              merged[item.recipe_id] = { ...item }
            } else {
              merged[item.recipe_id].author_id = item.author_id
              merged[item.recipe_id].name = item.name
              merged[item.recipe_id].created_at = item.created_at
              merged[item.recipe_id].updated_at = item.updated_at
              // Merge any other properties as needed
            }

            return merged
          }, {})
        )

        const updatedFeedData = await Promise.all(
          mergedData.map(async post => {
            const caloriesData = await fetchCaloriesData(post.recipe_id)
            return { ...post, caloriesData }
          })
        )

        setFeedData(updatedFeedData)
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchCaloriesData (recipeId) {
    const data = {
      servingSize: 1
    }

    const url = `https://nom-nom-recipe-web-be.herokuapp.com/recipe/calories/based_servings/${recipeId}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const result = await response.text()
        const parsedResult = JSON.parse(result)
        return parsedResult.totalCalories
      } else {
        throw new Error('Failed to send data')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRecommendationsByDietary(userData.user.id)
  }, [])

  function getTimeElapsed (createdAt) {
    const postDate = new Date(createdAt)
    const currentDate = new Date()

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - postDate.getTime()

    // Calculate the time difference in different units
    const seconds = Math.floor(timeDiff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    }
  }

  const HomeRightbar = () => {
    return (
      <>
        <StickyBox offsetTop={20} offsetBottom={20}>
          <div className={styles.rightbarContainer}>
            <span className={styles.rightbarText}>
              <b>Other places</b>
            </span>
          </div>
          <div className={styles.rignhtbarAd}>
            <img src="/images/BrandConcept.svg" alt="" />
          </div>
          <div className={styles.rightbarLink}>
            <h4 className={styles.rightbarTitle}>Other places</h4>
            <ul className={styles.rightbarList}>
              <a href="/allRecipe">
                <li>
                  <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                  Search All Recipes
                </li>
              </a>

              <a href="/refrigerator">
                <li>
                  <i className="fa-solid fa-filter fa-lg"></i>
                  Filter Recipes
                </li>
              </a>
            </ul>
          </div>
        </StickyBox>
      </>
    )
  }

  return (
    <div
      className={styles.feedContainer}
      style={{ display: 'flex', alignItems: 'flex-start' }}
    >
      <BackToTopButton />

      <div keyword="place_holder" className={styles.placeHolder}></div>
      <div className={styles.postContainer}>
        {isDietNull ? (
          <div className={styles.noResultsFound}>
            <img src="/images/noDiet.svg" alt="" />
            <h2>You dont&#8217;t have any diet preference</h2>
            <p>
              Choose a diet plan for personalized recommendations and guidance
              that match your goals!
            </p>
            <Button2
              icon={<i className="fa-solid fa-utensils"></i>}
              options={'Choose Your Diet Plan'}
              fn={() => (window.location.href = '/diet')}
            />
          </div>
        ) : (
          <div>
            <div className={styles.feedHeader}>
              <i className="fa-solid fa-kitchen-set fa-2xl"></i>
              <h1>Find your favorite dishes</h1>
            </div>

            {feedData.map(post => (
              <Suspense
                fallback={<div className={styles.cardLazyLoading}></div>}
                key={post.recipe_id}
              >
                <div>
                  <Post
                    recipe_id={post.recipe_id}
                    name={post.name}
                    description={post.description}
                    timeElapsed={getTimeElapsed(post.created_at)}
                    duration={post.duration.minutes}
                    caloriesData={Math.round(post.caloriesData)}
                    serving_size={Math.round(post.serving_size)}
                    image_link={(() => {
                      let imageLinkFallback = '/images/Default_img.svg'
                      try {
                        if (post.image_link) {
                          // Check if the image URL is valid by creating a new Image object
                          const img = new Image()
                          img.src = post.image_link
                          if (img.complete) {
                            // Image is successfully loaded
                            imageLinkFallback = post.image_link
                          }
                        }
                      } catch (error) {
                        // Error occurred, use fallback image URL
                      }
                      return imageLinkFallback
                    })()}
                  />
                </div>
              </Suspense>
            ))}
          </div>
        )}
      </div>

      <HomeRightbar />
    </div>
  )
}

function Post (props) {
  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <h1 className={styles.postRecipeName}>{props.name}</h1>
            <span className={styles.postDate}>{props.timeElapsed}</span>
          </div>
          <div className={styles.postTopRight} keyword="Place Holder"></div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postInfo}>
            <span>
              <i className="fa-solid fa-stopwatch"></i>
              <span>{props.duration} mins</span>
            </span>
            <span>
              <i className="fa-solid fa-fire"></i>
              <span>{props.caloriesData} kcal</span>
            </span>
            <span>
              <i className="fa-solid fa-bowl-food"></i>
              <span>Serving: {props.serving_size}</span>
            </span>
          </span>
          <br />
          <div className={styles.postText}>
            <p>{props.description}</p>
          </div>
          <div className={styles.postImgContainer}>
            <img
              className={styles.postImg}
              src={props.image_link}
              alt="Recipe Image"
            />
          </div>
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft} keyword="place_holder"></div>
          <Link
            to={`/recipe/${props.name}/${props.recipe_id}`}
            key={props.recipe_id}
          >
            <div className={styles.postBottomRight}>
              <span className={styles.postVisit}>
                <i className="fa-solid fa-right-long fa-2xl"></i>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
