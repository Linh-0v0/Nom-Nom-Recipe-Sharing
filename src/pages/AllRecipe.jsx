import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import styles from '../styles/AllRecipePage/AllRecipe.module.css'
import SearchBar from '../components/SearchBar'
import { withoutAuth } from '../components/SessionVerification/AuthChecking'
import { Button2 } from '../components/Button'
import AutoClickButton from '../components/AutoClickButton'
import { BackToTopButton } from '../components/Button'
import { Link } from 'react-router-dom'
const AllRecipe = () => {
  const perLoad = 12
  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState([])
  const [diet, setDiet] = useState([])
  const [country, setCountry] = useState([])
  const [itemsToRender, setItemsToRender] = useState(0)
  const [parentMessage, setParentMessage] = useState(data)

  const handleParentData = data => {
    setParentMessage(data)
  }

  const filteredData = useMemo(() => {
    const parentMessageArray = Object.values(parentMessage)

    if (searchInput && searchInput.trim() !== '') {
      if (!parentMessageArray[0].hasOwnProperty('recipe_id')) {
        const filteredArray = parentMessageArray[0].filter(
          obj =>
            obj.name &&
            obj.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        return filteredArray
      } else {
        const filteredArray = parentMessageArray.filter(
          obj =>
            obj.name &&
            obj.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        return filteredArray
      }
    } else if (
      parentMessageArray.length > 0 &&
      parentMessageArray[0].hasOwnProperty('recipe_id')
    ) {
      return parentMessageArray
    } else if (typeof parentMessageArray[0] != 'undefined') {
      if (parentMessageArray[0].length > 0) {
        return parentMessageArray[0]
      }
    } else {
      return []
    }
  }, [parentMessage, searchInput])

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        'https://nom-nom-recipe-web-be.herokuapp.com/recipe'
      )
      setData(response.data)
    } catch (error) {
      console.log(error)
      setData([])
    }
  }

  const fetchDietary = async () => {
    try {
      const response = await axios.get(
        'https://nom-nom-recipe-web-be.herokuapp.com/dietary/get-all'
      )
      setDiet(response.data)
    } catch (error) {
      console.log(error)
      setDiet([])
    }
  }

  const fetchCountry = async () => {
    try {
      const response = await axios.get(
        'https://nom-nom-recipe-web-be.herokuapp.com/country/get-all'
      )
      setCountry(response.data)
    } catch (error) {
      console.log(error)
      setCountry([])
    }
  }

  useEffect(() => {
    fetchRecipes()
    fetchCountry()
    fetchDietary()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setItemsToRender(prev => prev + perLoad)
          }
        })
      },
      { rootMargin: '0px 0px 10px 0px' } // Load next batch before the bottom of the page
    )

    const bottomElement = document.querySelector('#bottom')
    if (bottomElement) {
      observer.observe(bottomElement)
    }

    return () => {
      if (bottomElement) {
        observer.unobserve(bottomElement)
      }
    }
  }, [perLoad])

  const Card = lazy(() => import('../components/Card'))
  return (
    <div className={styles.page} id="bottom">
      <Header />
      <BackToTopButton />
      <div className={styles.text}>
        <SearchBar
          setSearchInput={setSearchInput}
          food={data}
          diet={diet}
          country={country}
          onDataFromChild={handleParentData}
        ></SearchBar>
      </div>
      <div>
        {filteredData.length === 0 ? (
          <div className={styles.noResultsFound}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnTCjL_7-pIzDQg2W30Vy1wdTNuy8zYAP8A&usqp=CAU"
              alt=""
            />
            <h2>Can&#8217;t find a recipe? </h2>
            <div>
              <p>
                Be the first and share your own. Join the fun and help your
                fellow cooks!
              </p>
            </div>
            <Button2
              icon={<i className={'fa-solid fa-pen-to-square'}></i>}
              options={'Add recipe'}
            />
          </div>
        ) : (
          <div>
            <div className={styles.cardContainer}>
              {filteredData.slice(0, itemsToRender).map(item => (
                <Link
                  to={`/recipe/${item.name}/${item.recipe_id}`}
                  key={item.recipe_id}
                >
                  <Suspense
                    fallback={<div className={styles.cardLazyLoading}></div>}
                  >
                    <Card
                      recipe_id={item.recipe_id}
                      image={item.image_link}
                      title={item.name}
                      description={item.description}
                    />
                  </Suspense>
                </Link>
              ))}
              <div keyword="place_holder"></div>
            </div>

            {filteredData.length > itemsToRender && (
              <div className={styles.loadMore}>
                <AutoClickButton
                  fn={() => setItemsToRender(itemsToRender + perLoad)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default withoutAuth(AllRecipe)
