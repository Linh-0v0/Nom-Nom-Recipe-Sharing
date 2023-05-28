import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import Header from '../components/Header'
import styles from '../styles/RefrigeratorPage/Refrigerator.module.css'
import { withoutAuth } from '../components/SessionVerification/AuthChecking'
import { BackToTopButton } from '../components/Button'
import Select from 'react-select'
import { Button2 } from '../components/Button'
import AutoClickButton from '../components/AutoClickButton'
import { Link, useNavigate } from 'react-router-dom'

const Refrigerator = () => {
  const [firstTime, setFirstTime] = useState(true)

  const [ingData, setIngData] = useState([])

  const perLoad = 12

  const [data, setData] = useState([])
  const [itemsToRender, setItemsToRender] = useState(0)

  const [selectedOptions, setSelectedOptions] = useState([])

  const handleOptionChange = selected => {
    setSelectedOptions(selected.map(item => item.value))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setFirstTime(false)
    if (selectedOptions.length === 0) {
      setData(await fetchDataWithOutInput())
    } else {
      setData(await fetchDataWithInput())
    }
  }

  async function fetchDataWithInput () {
    const url =
      'https://nom-nom-recipe-web-be.herokuapp.com/recipe/search-by-ingredients'
    const body = {
      ingredients: selectedOptions
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchDataWithOutInput () {
    const url = 'https://nom-nom-recipe-web-be.herokuapp.com/recipe'
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          'https://nom-nom-recipe-web-be.herokuapp.com/ingredient/get-all'
        )
        const data = await response.json()

        const extractedData = data.map(child => child.ing_name)
        setIngData(
          extractedData.map(item => ({
            value: item,
            label: item
          }))
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
      }
    }

    fetchOptions()
  }, [])

  const navigation = useNavigate()

  const clickToAdd = () => {
    navigation('/publishRecipe')
  }

  const Card = lazy(() => import('../components/Card'))

  return (
    //
    <div className="page" id="botton">
      <Header />
      <BackToTopButton />
      <div className={styles.text}>
        <div className={styles.form_Container}>
          <form
            onSubmit={handleSubmit}
            //method="POST"
          >
            <div className={styles.filter_Container}>
              <Select
                closeMenuOnSelect={false}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                options={ingData}
                isMulti={true}
                maxMenuHeight={160}
                onChange={handleOptionChange}
                placeholder={'Choose your ingredients...'}
                onMenuScrollToBottom={() => setIngData([])}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? '#ff8600' : '#ff8600',
                    borderWidth: '2px',
                    borderRadius: '8px',
                    boxShadow: state.isFocused ? 0 : 0,
                    '&:hover': {
                      borderColor: '#ff8600',
                      outline: 'none'
                    }
                  })
                }}
              />

              <div className={styles.btnContainer}>
                <Button2
                  type={'submit'}
                  options={'Search'}
                  fn={() => ''}
                  icon={<i className="fa-solid fa-magnifying-glass"></i>}
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          {firstTime ? (
            <div className={styles.first_Time}>
              <img src="/images/TypeE.svg" alt="" />
              <h2>
                Choose the ingredient and we will found the suitable recipe for
                you
              </h2>
            </div>
          ) : (
            <>
              {data.length === 0 ? (
                <div className={styles.noResultsFound}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnTCjL_7-pIzDQg2W30Vy1wdTNuy8zYAP8A&usqp=CAU"
                    alt=""
                  />
                  <h2>Can&#8217;t find a recipe? </h2>
                  <div>
                    <p>
                      Be the first and share your own. Join the fun and help
                      your fellow cooks!
                    </p>
                  </div>
                  <Button2
                    icon={<i className={'fa-solid fa-pen-to-square'}></i>}
                    options={'Add recipe'}
                    fn={clickToAdd}
                  />
                </div>
              ) : (
                <div>
                  <div className={styles.cardContainer}>
                    {data.slice(0, itemsToRender).map(item => (
                      <Link
                        to={`/recipe/${item.name}/${item.recipe_id}`}
                        key={item.recipe_id}
                      >
                        <Suspense
                          fallback={
                            <div className={styles.cardLazyLoading}></div>
                          }
                        >
                          <Card
                            image={item.image_link}
                            title={item.name}
                            description={item.description}
                            id={item.recipe_id}
                          />
                        </Suspense>
                      </Link>
                    ))}
                    <div keyword="place_holder"></div>
                  </div>

                  {data.length > itemsToRender && (
                    <div className={styles.loadMore}>
                      <AutoClickButton
                        fn={() => setItemsToRender(itemsToRender + perLoad)}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withoutAuth(Refrigerator)
