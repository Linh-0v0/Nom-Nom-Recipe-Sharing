import Header from '../components/Header'
// import { CollectionSection } from '../components/UserProfileComponents/UserProfileCollection/CollectionSection'
import UserProfileSide from '../components/UserProfileComponents/UserProfileSide/UserProfileSide'
import styles from '../styles/UserProfile/UserProfileMainPage.module.css'
import { RecipeSection } from '../components/UserProfileComponents/UserProfileRecipe/RecipeSection'
import { useState } from 'react'

import { BackToTopButton } from '../components/Button'
import { withoutAuth } from '../components/SessionVerification/AuthChecking'
import { CollectionSection } from '../components/UserProfileComponents/UserProfileCollection/CollectionSection'

const UserProfileMainPage = () => {
  const [currentStyle, setCurrentStyle] = useState('none')

  const [updateForm, setUpdateForm] = useState()

  const sectionDisplay = {
    collection: 'flex',
    recipe: 'none'
  }

  const [display, setDisplay] = useState(sectionDisplay)

  return (
    <>
      <Header />
      <div>
        <div
          className={`${styles.flexRow} ${styles.profileMainContainer}`}
          style={{ display: 'flex', alignItems: 'flex-start' }}
        >
          {updateForm}

          <BackToTopButton />

          <div className={`${styles.sectionContainer}`}>
            <CollectionSection
              display={display}
              setCurrentStyle={setCurrentStyle}
              setUpdateForm={setUpdateForm}
            />
            <RecipeSection display={display} />
          </div>

          <UserProfileSide
            display={display}
            setDisplay={setDisplay}
          ></UserProfileSide>
        </div>
      </div>
    </>
  )
}

export default withoutAuth(UserProfileMainPage)
