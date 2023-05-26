import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FetchUserCollections } from '../UserProfileComponents/UserProfileCollection/FetchUserCollections'
export const AuthContext = React.createContext()

export const logout = async () => {
  try {
    const response = await fetch(
      'https://nom-nom-recipe-web-be.herokuapp.com/auth/logout',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.ok) {
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('refreshtoken')

      window.location.reload()
    } else {
      throw new Error('Error logging out')
    }
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export const dietFetch = async userData => {
  if (userData) {
    try {
      const response = await fetch(
        `https://nom-nom-recipe-web-be.herokuapp.com/get-dietary-preference/${userData.user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()

        return data
      } else {
        throw new Error('Unable to get dietary preference')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const FetchUserRecipe = async userData => {
  const [userRecipes, setUserRecipes] = useState([])

  let config = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/user/${userData.user.id}`
  }

  const res = await axios.request(config).then(res && setUserRecipes(res.data))

  return userRecipes
}

const accesstoken = localStorage.getItem('accesstoken')

const AuthContextProvider = props => {
  const [userData, setUserData] = useState(null)

  const [dietData, setDietData] = useState(null)

  const userCollectionData = FetchUserCollections()

  const getUserSession = async () => {
    if (accesstoken) {
      try {
        const response = await fetch(
          `https://nom-nom-recipe-web-be.herokuapp.com/user/my-profile`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: accesstoken
            }
          }
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.msg)
        }
        return data
      } catch (error) {
        return null
      }
    } else {
      return null
    }
  }

  const getDietaryData = async userData => {
    if (userData) {
      try {
        const response = await fetch(
          `https://nom-nom-recipe-web-be.herokuapp.com/get-dietary-preference/${userData.user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.ok) {
          const data = await response.json()

          setDietData(data)
        } else {
          throw new Error('Unable to get dietary preference')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getUserSession()
      .then(data => {
        setUserData(data)
        getDietaryData(data)
      })
      .catch(error => {
        setUserData(null)
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userData,
        logout,
        dietData,
        dietFetch,
        userCollectionData
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
