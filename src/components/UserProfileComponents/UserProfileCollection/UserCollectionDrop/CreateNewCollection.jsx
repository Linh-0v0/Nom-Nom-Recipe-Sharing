import styles from '../../../../styles/UserProfile/UserProfleCollection/CollectionDropList.module.css'
import { Button1, DefaultButton } from '../../../Button'
import { useState } from 'react'
import ClickChangeStyle from '../../../ClickChangeStyle'
import axios from 'axios'
import Modal from '../../../ModalComponents/Modal'
import useModal from '../../../ModalComponents/useModal'

export const CreateNewCollection = props => {
  const style = {
    backgroundColor: 'transparent',
    backgroundColorHover: 'rgba(255, 196, 131, 1)'
  }

  const [currentDisplay, setCurrentDisplay] = useState('none')

  const [message, setMessage] = useState()
  const [imageURL, setImageURL] = useState('')

  const { isShowing, toggle } = useModal()

  const styleElement = {
    default: 'none',
    change: 'block'
  }

  let handleClick = ClickChangeStyle(
    currentDisplay,
    setCurrentDisplay,
    styleElement
  )

  const [value, setValue] = useState('')

  let config = {
    method: 'post',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/collection`,
    headers: {
      Authorization: localStorage.accesstoken
    },
    data: {
      name: value,
      note: '',
      recipeIds: [props.id]
    }
  }

  const [empty, setEmpty] = useState('')

  const handleInput = () => {
    if (value == '') {
      return <div>Name is required</div>
    } else {
      return <div></div>
    }
  }

  const handleSubmit = async () => {
    if (value !== '') {
      try {
        const res = await axios.request(config)
        setMessage(res.data.message)
        props.setCurrent('none')
        toggle()
        UploadCollectionImage(imageURL, res.data.collectionId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={''}
        modalMsg={message}
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={() => {
          toggle()
          window.location.reload(false)
        }}
      />
      <div className={`${styles.createNewCollection}`}>
        <DefaultButton
          fn={handleClick}
          options="Create new collection"
          type="button"
          style={style}
          className={`${styles.button}`}
        />
      </div>

      <div
        className={`${styles.searchBar} ${styles.hiddenInputField}`}
        style={{ display: `${currentDisplay}` }}
      >
        <input
          value={value}
          style={{ backgroundColor: 'white' }}
          onChange={e => setValue(e.target.value)}
          className={`${styles.inputFieldContainer} `}
        />
        <div>
          {handleInput()}
          <Button1 options={'Create'} fn={handleSubmit} />
        </div>
      </div>
    </>
  )
}
