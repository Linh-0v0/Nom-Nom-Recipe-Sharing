import React, { useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const [file, setFile] = useState(null)
  const [userId, setUserId] = useState('')

  const handleChange = e => {
    setFile(e.target.files[0])
    console.log('LOGG:', e.target.files[0])
  }
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('avatarImage', file)

    try {
      axios
        .post(`http://localhost:3000/user/update-avatar/${userId}`, formData, config)
        .then(res => {
          console.log(res.data)
          // Do something with response data
        })
        .catch(err => {
          console.log(err)
          // Handle error
        })
    } catch (err) {
      console.log(err)
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          name="userId"
          id="userId"
          onChange={e => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="avatarImage">Avatar Image:</label>
        <input
          type="file"
          name="avatarImage"
          id="avatarImage"
          onChange={handleChange}
        />
      </div>
     
      <button type="submit">Submit</button>
    </form>
  )
}

export default UserProfile
