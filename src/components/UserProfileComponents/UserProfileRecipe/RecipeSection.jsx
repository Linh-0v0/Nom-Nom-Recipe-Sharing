import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'

import { Suspense, lazy, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DefaultButton } from '../../Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../SessionVerification/AuthContext'

import useModal from '../../ModalComponents/useModal'
import Modal from '../../ModalComponents/Modal'
import { UpdateRecipe } from './UpdateRecipe'
import { FetchRecipeByID } from '../../Fetch/Recipes/FetchRecipeByID'
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
  // console.log('user data ', userData)

  // const userID = userData.user.id
  let config = {
    method: 'get',
    url: `http://localhost:3000/recipe/user/${userData.user.id}`,
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

  const handleUpdate = (recId, name, des, serv, dur) => {
    setId(recId)
    setUpdateData({
      name: name,
      serving_size: serv,
      duration: dur,
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

  const recipeTmp = recipes.map(ele => (
    <Suspense key={ele.recipe_id}>
      <Card
        key={ele.recipe_id}
        userID={ele.author_id}
        image={ele.image_link}
        title={ele.name}
        category={['asd', 'asd1', 'asd2']}
        location="Downtown, Seattle WA"
        description={ele.description}
        fn={() =>
          handleUpdate(
            ele.recipe_id,
            ele.name,
            ele.description,
            ele.serving_size,
            ele.duration
          )
        }
        fn2={() => handleMoveToRecipePage(ele.name, ele.recipe_id)}
      />
    </Suspense>
    // </Link>
  ))

  let configUpdate = {
    method: 'PUT',
    url: `http://localhost:3000/recipe/${id}`,
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
    // console.log('submit dc roi ne')
    try {
      const res = await axios.request(configUpdate)
      setMessage(res.data.message)
      UploadImage(updateData.image_link, id, setMessage)
      secondToggle()
      toggle()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`${styles.collectionMainContainer} ${styles.flexRow}`}
      style={{ display: `${props.display.recipe}` }}
      // style={{ display: `none` }}
    >
      <Modal
        isShowing={ndIsShowing}
        hide={secondToggle}
        btnMsg={'Confirm'}
        title={''}
        modalMsg={
          // <UpdateForm
          //   // collection={props.collection}
          //   setUpdateForm={props.setUpdateForm}
          //   setCurrentStyle={props.setCurrentStyle}
          //   setName={setName}
          //   setNote={setNote}
          //   name={name}
          //   note={note}
          // />
          message
        }
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={
          // console.log('hello') // navigate('/', { replace: true })
          // handleSubmit
          () => {
            refreshPage()
          }
        }
      />
      <Modal
        isShowing={isShowing}
        hide={toggle}
        btnMsg={'Confirm'}
        title={'Update collection'}
        modalMsg={
          // <UpdateForm
          //   // collection={props.collection}
          //   setUpdateForm={props.setUpdateForm}
          //   setCurrentStyle={props.setCurrentStyle}
          //   setName={setName}
          //   setNote={setNote}
          //   name={name}
          //   note={note}
          // />
          <UpdateRecipe
            data={updateData}
            id={id}
            setData={setUpdateData}
            setMessage={setMessage}
          />
        }
        closeable={true}
        titleIcon={<i className="fa-solid fa-circle-check"></i>}
        btnFn={
          // console.log('hello') // navigate('/', { replace: true })
          // handleSubmit
          handleSubmit
        }
      />
      <div className={`${styles.createNewContainer} ${styles.flexColumn}`}>
        <DefaultButton
          options={<i className="fa-solid fa-plus fa-xl"></i>}
          style={style}
          className={`${styles.createNewButton}`}
          fn={handleCreateNewRecipe}
        />
        {/* <button onClick={toggle}></button> */}
      </div>
      {/* <Collections collection={collection}></Collections>
      <Collections collection={collection}></Collections>
      <Collections collection={collection}></Collections>
      <Collections collection={collection}></Collections> */}

      <div className={`${styles.collectionMainContainer} ${styles.flexRow}`}>
        {/* <Suspense>{recipeTmp}</Suspense> */}
        {recipeTmp}
      </div>
    </div>
  )
}
