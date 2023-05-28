import axios from 'axios'
import { useState } from 'react'

export default function EnterToSubmit(value, setValue) {
  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleInputChange = setValue => {
    setValue(e.target.value)
  }

  const handleKeyDown = value => {
    if (e.key === 'Enter') {
      handleSubmit(e, value)
    }
  }
}
