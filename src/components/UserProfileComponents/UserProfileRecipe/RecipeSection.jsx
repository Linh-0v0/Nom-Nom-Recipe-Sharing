import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'
import { Suspense, lazy, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DefaultButton } from '../../Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../SessionVerification/AuthContext'

import useModal from '../../ModalComponents/useModal'
import Modal from '../../ModalComponents/Modal'
import { UpdateRecipe } from './UpdateRecipe'
import { UploadCollectionImage, UploadImage } from '../../ApiPost/LoadImage'

export const RecipeSection = props => {
  const [id, setId] = useState('')

  const [updateData, setUpdateData] = useState({
    name: '',
    serving_size: '',
    duration: '',
    image_link: '',
    description: ''
  })

  const [message, setMessage] = useState()

  const style = {
    backgroundColor: 'var(--light-orange)',
    color: 'var(--black-purple)',
    backgroundColorHover: 'white',
    colorHover: 'var(--black-purple)'
  }

  const { isShowing, toggle, ndIsShowing, secondToggle } = useModal(true)

  const { userData } = useContext(AuthContext)

  let config = {
    method: 'get',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/user/${userData.user.id}`,
    headers: {
      Authorization: localStorage.accesstoken
    }
  }
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    axios
      .request(config)
      .then(res => setRecipes(res.data))
      .catch(error => console.log(error))
  }, [])

  const Card = lazy(() => import('../../Card'))

  const handleUpdate = (recId, name, des, serv, servUnit, dur) => {
    setId(recId)
    setUpdateData({
      name: name,
      serving_size: serv,
      serving_unit: servUnit,
      duration: dur,
      // image_link: '',
      description: des
    })
    toggle()
  }

  const navigate = useNavigate()

  const handleCreateNewRecipe = () => {
    navigate(`/publishRecipe`)
  }

  const handleMoveToRecipePage = (name, id) => {
    navigate(`/recipe/${name}/${id}`)
  }

  const recipeTmp = () => {
    if (recipes.length > 0) {
      return recipes.map(ele => (
        <Suspense key={ele.recipe_id}>
          <Card
            recipe_id={ele.recipe_id}
            userID={ele.author_id}
            title={ele.name}
            description={ele.description}
            fn={() =>
              handleUpdate(
                ele.recipe_id,
                ele.name,
                ele.description,
                ele.serving_size,
                ele.serving_unit,
                ele.duration
              )
            }
            fn2={() => handleMoveToRecipePage(ele.name, ele.recipe_id)}
          />
        </Suspense>
      ))
    } else {
      return <div>You did not create any recipe yet, please create one</div>
    }
  }

  let configUpdate = {
    method: 'PUT',
    url: `https://nom-nom-recipe-web-be.herokuapp.com/recipe/${id}`,
    headers: {
      Authorization: localStorage.accesstoken
    },
    data: updateData
  }

  const refreshPage = () => {
    window.location.reload(false)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios
        .request(configUpdate)
        .then(
          setMessage(res.data.message),
          UploadImage(updateData.image_link, id, setMessage),
          secondToggle(),
          toggle()
        )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`${styles.collectionMainContainer} ${styles.flexRow}`}
      style={{ display: `${props.display.recipe}` }}
    >
      <Modal
        isShowing={ndIsShowing}
        hide={secondToggle}
        btnMsg={'Confirm'}
        title={''}
        modalMsg={message}
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={() => {
          refreshPage()
        }}
      />
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={'Update collection'}
        modalMsg={
          <UpdateRecipe
            data={updateData}
            id={id}
            setData={setUpdateData}
            setMessage={setMessage}
          />
        }
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={handleSubmit}
      />
      <div className={`${styles.createNewContainer} ${styles.flexColumn}`}>
        <DefaultButton
          options={<i className="fa-solid fa-plus fa-xl"></i>}
          style={style}
          className={`${styles.createNewButton}`}
          fn={handleCreateNewRecipe}
        />
      </div>

      <div className={`${styles.collectionMainContainer} ${styles.flexRow}`}>
        {recipeTmp()}
      </div>
    </div>
  )
}
