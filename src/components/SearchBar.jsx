import React, { useEffect, useState } from 'react'
import styles from '../styles/SearchBar.module.css'
import { Button2 } from './Button'
import Select from 'react-select'

const SearchBar = ({
  setSearchInput,
  food,
  diet,
  country,
  onDataFromChild
}) => {
  const [childMessage, setChildMessage] = useState('')

  const handleChildData = data => {
    setChildMessage(data)
    onDataFromChild(data)
  }

  useEffect(() => {
    handleChildData(food)
  }, [food])

  const [dietOptions, setDietOptions] = useState(null)
  const [countryOptions, setCountryOptions] = useState(null)

  const [selectedDiet, setSelectedDiet] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    if (selectedDiet != null && selectedDiet != []) {
      const recipesByDietaryPreference = await fetch(
        `https://nom-nom-recipe-web-be.herokuapp.com/recipe/by-dietary/${selectedDiet.value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const recipesByDietaryPreferenceJSON =
        await recipesByDietaryPreference.json()

      if (selectedCountry != null && selectedCountry != []) {
        const recipesByCountryPreference = await fetch(
          `https://nom-nom-recipe-web-be.herokuapp.com/recipe/by-country/${selectedCountry.value}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const recipesByCountryPreferenceJSON =
          await recipesByCountryPreference.json()

        handleChildData(
          compareObjectsByRecipeId(
            recipesByCountryPreferenceJSON,
            recipesByDietaryPreferenceJSON
          )
        )
      } else {
        handleChildData(recipesByDietaryPreferenceJSON)
      }
    } else {
      if (selectedCountry != null && selectedCountry != []) {
        const recipesByCountryPreference = await fetch(
          `https://nom-nom-recipe-web-be.herokuapp.com/recipe/by-country/${selectedCountry.value}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const recipesByCountryPreferenceJSON =
          await recipesByCountryPreference.json()
        handleChildData(recipesByCountryPreferenceJSON)
      } else {
        handleChildData([food])
      }
    }

    const searchValue = event.target.elements.search.value
    setSearchInput(searchValue)
  }

  function compareObjectsByRecipeId (obj1, obj2) {
    const result = {}

    for (const key1 in obj1) {
      for (const key2 in obj2) {
        if (obj1[key1].recipe_id === obj2[key2].recipe_id) {
          result[key1] = {
            recipe_id: obj1[key1].recipe_id,
            ...obj1[key1]
          }
          break
        }
      }
    }

    return result
  }

  function transformData (diet, country) {
    const dietArray = Array.from(diet, item => item.name)
    const transformedDietData = dietArray.map(item => ({
      value: item,
      label: item
    }))
    setDietOptions(transformedDietData)
    const countryArray = Array.from(country, item => ({
      value: item.id,
      label: item.name
    }))
    const transformedCountryData = countryArray.reduce((accumulator, item) => {
      const existingItem = accumulator.find(i => i.label === item.label)
      if (!existingItem) {
        accumulator.push(item)
      }
      return accumulator
    }, [])

    setCountryOptions(transformedCountryData)
  }

  useEffect(() => {
    transformData(diet, country)
  }, [food, diet, country])

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        //method="POST"
      >
        <div className={styles.form_Container}>
          <div className={styles.search_Container}>
            <input
              autoFocus={false}
              placeholder="Type..."
              type="text"
              name="search" // Add a name attribute to the input element
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
          <div className={styles.filter_Container}>
            <Select
              maxMenuHeight={160}
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              options={dietOptions}
              onChange={setSelectedDiet}
              placeholder={'Choose your dietary'}
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
            <Select
              maxMenuHeight={160}
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              options={countryOptions}
              onChange={setSelectedCountry}
              placeholder={"Choose the food's origin"}
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
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
