import axios from 'axios'
import { useEffect, useState } from 'react'

export const FetchAllIngAndCountry = () => {
  const [countries, setContries] = useState([])
  const [countryOptions, setCountryOptions] = useState(null)
  const [unitOptions, setUnitOptions] = useState(null)
  const [units, setUnits] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ingredientOPtion, setIngredientOption] = useState(null)
  const [diets, setDiets] = useState([])
  const [dietOptions, setDietOptions] = useState(null)

  let configCountries = {
    method: 'GET',
    url: 'https://nom-nom-recipe-web-be.herokuapp.com/country/get-all'
  }

  let configUnits = {
    method: 'GET',
    url: 'https://nom-nom-recipe-web-be.herokuapp.com/unit/get-all'
  }

  let configIng = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/ingredient/get-all`
  }

  let configDiet = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/dietary/get-all`
  }
  const fetch = async () => {
    try {
      const res = await axios.all([
        axios.request(configCountries),
        axios.request(configUnits),
        axios.request(configIng),
        axios.request(configDiet)
      ])

      setContries(res[0].data)
      setUnits(res[1].data)
      setIngredients(res[2].data)
      setDiets(res[3].data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const transformData = () => {
    const countriesArray = Array.from(countries, item => [item.id, item.name])
    const transformedCountryData = countriesArray.map(item => ({
      value: item[0],
      label: item[1]
    }))

    const unitsArray = Array.from(units, item => item.unit_name)
    const transformUnitData = unitsArray.map(item => ({
      value: item,
      label: item
    }))

    const ingArray = Array.from(ingredients, item => [item.id, item.ing_name])
    const transformIngData = ingArray.map(item => ({
      value: item[0],
      label: item[1]
    }))

    const dietArray = Array.from(diets, item => item.name)
    const transFormedDiet = dietArray.map(item => ({
      value: item,
      label: item
    }))

    setUnitOptions(transformUnitData)
    setCountryOptions(transformedCountryData)
    setIngredientOption(transformIngData)
    setDietOptions(transFormedDiet)
  }

  useEffect(() => {
    transformData()
  }, [countries, units, ingredients])

  return {
    countryOptions,
    unitOptions,
    ingredientOPtion,
    countries,
    ingredients,
    dietOptions
  }
}
