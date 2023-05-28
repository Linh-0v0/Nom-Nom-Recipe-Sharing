import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, json } from 'react-router-dom'

export const UploadImage = async (image, id) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif']

  const formData = new FormData()
  formData.append('recipeImage', image, image.name)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.accesstoken
    }
  }
  let URL = `https://nom-nom-recipe-web-be.herokuapp.com/recipe/update-img/${id}`

  try {
    const res = await axios.post(URL, formData, config)
  } catch (error) {
    console.log(error)
  }
}

export const UploadCollectionImage = async (image, id) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif']

  const formData = new FormData()
  formData.append('collectionImage', image, image.name)

  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.accesstoken
    }
  }
  let URL = `https://nom-nom-recipe-web-be.herokuapp.com/collection/update-img/${id}`

  try {
    const res = await axios.post(URL, formData, config)
  } catch (error) {
    console.log(error)
  }
}

export const LoadUserImg = async id => {
  let configImg = {
    method: 'GET',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/user/get-avatar/${id}`
  }

  try {
    const res = await axios.request(configImg)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
