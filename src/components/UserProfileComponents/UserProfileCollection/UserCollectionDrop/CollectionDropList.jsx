import styles from '../../../../styles/UserProfile/UserProfleCollection/CollectionDropList.module.css'
import searchIcon from '../../../../images/Nom nom icons/Search_alt.svg'

import { CreateNewCollection } from './CreateNewCollection'
import { CollectionInDropList } from './CollectionInDropList'
import { FetchUserCollections } from '../FetchUserCollections'
import { useRef, useState } from 'react'
const CollectionDropList = props => {
  const userCollections = FetchUserCollections()
  const collection = userCollections.map(ele => (
    <CollectionInDropList
      current={props.current}
      setCurrent={props.setCurrent}
      style={props.style}
      key={ele.collection_id}
      id={props.id}
      // recipe={props.recipe}
      collection={ele}
    ></CollectionInDropList>
  ))

  const collectionDrop = useRef(null)

  const handleBlur = e => {
    if (collectionDrop.current && !collectionDrop.current.contains(e.target)) {
      props.setCurrent('none')
    }
  }

  document.addEventListener('mousedown', handleBlur)

  return (
    <div
      className={`${styles.listMainContainer} ${styles.flexColumn} ${styles.boxShadowPurple}`}
      style={{ display: `${props.current}` }}
      // onBlur={handleBlur}
      ref={collectionDrop}
      // onFocus={isFocus}
    >
      <div className={`${styles.searchBarAndCreateButtonContainer}`}>
        <div className={`${styles.searchBar} ${styles.flexRow}`}>
          {/* <img
            className={`${styles.searchIconContainer}`}
            src={searchIcon}
          ></img> */}
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className={`${styles.inputFieldContainer}`} />
          {/* check with user collections */}
        </div>

        <CreateNewCollection
          setCurrent={props.setCurrent}
          id={props.id}
        ></CreateNewCollection>
      </div>
      <div className={`${styles.itemsContainer}`}>{collection}</div>
    </div>
  )
}

export default CollectionDropList
