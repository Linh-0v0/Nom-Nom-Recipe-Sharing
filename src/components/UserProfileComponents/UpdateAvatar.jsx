import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../styles/UserProfile/UserProfileDetail/UserProfileDetail.module.css'
import Modal from 'react-modal'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button1 } from '../Button'
import { Suspense } from 'react'
const UpdateAvatar = props => {
  const [imgUrl, setImgUrl] = useState('')
  const [file, setFile] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [croppedImage, setCroppedImage] = useState(null)
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 400,
    height: 400
  })
  const [imgErrorMsg, setImgErrorMsg] = useState('')
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif']

  Modal.setAppElement('#root')

  useEffect(() => {
    axios
      .get(
        `https://nom-nom-recipe-web-be.herokuapp.com/user/get-avatar/${props.user.id}`
      )
      .then(response => {
        setImgUrl(response.data)
      })
      .catch(error => {
        // Handle the error
        console.error(error)
      })
  }, [])

  const handleChange = e => {
    const selectedFile = e.target.files[0]
    setModalIsOpen(true)

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setImgErrorMsg('')

      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onload = event => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
          const { width, height } = img

          const maxWidth = 800
          const maxHeight = 800

          let newWidth = width
          let newHeight = height

          if (width > height) {
            if (width > maxWidth) {
              newWidth = maxWidth
              newHeight = (height * maxWidth) / width
            }
          } else {
            if (height > maxHeight) {
              newHeight = maxHeight
              newWidth = (width * maxHeight) / height
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = newWidth
          canvas.height = newHeight

          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, newWidth, newHeight)

          canvas.toBlob(
            blob => {
              const resizedFile = new File([blob], selectedFile.name, {
                type: selectedFile.type,
                lastModified: selectedFile.lastModified
              })
              setFile(resizedFile)
              setCroppedImage(resizedFile)
              handleCropChange(crop)
            },
            selectedFile.type,
            1
          )
        }
      }
    } else {
      setImgErrorMsg(
        'Invalid file type. Please upload a PNG, JPEG, WebP, or JFIF image.'
      )
    }
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleCropChange = crop => {
    setCrop(crop)
    å
    if (file && crop.width && crop.height) {
      getCroppedImage(file, crop)
    }
  }

  const getCroppedImage = async (file, crop) => {
    if (file && crop.width && crop.height) {
      const image = await createImageBitmap(file)

      const canvas = document.createElement('canvas')
      canvas.width = crop.width
      canvas.height = crop.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      )

      canvas.toBlob(
        blob => {
          const croppedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: file.lastModified
          })
          setCroppedImage(croppedFile)
        },
        file.type,
        1
      )
    }
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (croppedImage) {
      const formData = new FormData()

      formData.append('avatarImage', croppedImage, file.name)

      try {
        const response = await axios.post(
          `https://nom-nom-recipe-web-be.herokuapp.com/user/update-avatar/${props.user.id}`,
          formData
        )

        window.location.reload()

        setModalIsOpen(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <div className={`${styles.avatarSmallContainer}`}>
        <img src={imgUrl} alt="Avatar" />

        <div className={`${styles.updateImgTextContainer}`} onClick={openModal}>
          <i className="fa-solid fa-pen-to-square fa-2xl"></i>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            margin: '100px 0px 0px 0px'
          }
        }}
      >
        <h2>Update Image:</h2>
        <div
          style={{
            paddingBottom: '1.4rem',
            paddingLeft: '1rem',
            color: 'rgba(0, 0, 0, 0.6)'
          }}
        >
          <p>
            * You click 'Submit' the image after dragging the crop box to area
            you want.
          </p>
          <p>
            * A square-shaped crop is recommended to avoid image distortion.
          </p>
          {imgErrorMsg != '' && (
            <p
              style={{
                paddingTop: '0.5rem',
                color: 'rgba(231, 0, 0, 0.59)'
              }}
            >
              **{imgErrorMsg}**
            </p>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <ReactCrop
            aspect={1 / 1}
            ruleOfThirds={true}
            crop={crop}
            onChange={handleCropChange}
            onComplete={crop => {
              getCroppedImage(file, crop)
            }}
          >
            {file && <img src={URL.createObjectURL(file)} alt="Avatar" />}
          </ReactCrop>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="file"
              name="avatarImage"
              id="avatarImage"
              onChange={handleChange}
            />
          </div>
          <br />
          <Button1 type="submit" options={'Submit'} />
        </form>
        <span className={`${styles.closeIconDiv}`} onClick={closeModal}>
          <i className="fa-solid fa-xmark fa-lg"></i>
        </span>
      </Modal>
    </>
  )
}

export default UpdateAvatar
