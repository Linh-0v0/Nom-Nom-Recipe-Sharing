import styles from '../../../../styles/UserProfile/UserProfleCollection/CollectionDropList.module.css'
import { CreateNewCollection } from './CreateNewCollection'
import { CollectionInDropList } from './CollectionInDropList'
import { FetchUserCollections } from '../FetchUserCollections'
import { useRef, useState } from 'react'
const CollectionDropList = props => {
  const userCollections = FetchUserCollections()
  const [input, setInput] = useState('')

  // let collection = ''

  const collectionDrop = useRef(null)

  const handleBlur = e => {
    if (collectionDrop.current && !collectionDrop.current.contains(e.target)) {
      props.setCurrent('none')
    }
  }

  document.addEventListener('mousedown', handleBlur)

  const handleSubmit = () => {
    if (input == '') {
      return userCollections.map(ele => (
        <CollectionInDropList
          current={props.current}
          setCurrent={props.setCurrent}
          style={props.style}
          key={ele.collection_id}
          id={props.id}
          collection={ele}
        ></CollectionInDropList>
      ))
    } else {
      let newColl = userCollections.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
      )
      return newColl.map(ele => (
        <CollectionInDropList
          current={props.current}
          setCurrent={props.setCurrent}
          style={props.style}
          key={ele.collection_id}
          id={props.id}
          collection={ele}
        ></CollectionInDropList>
      ))
    }
  }
  return (
    <div
      className={`${styles.listMainContainer} ${styles.flexColumn} ${styles.boxShadowPurple}`}
      style={{ display: `${props.current}` }}
      ref={collectionDrop}
    >
      <div className={`${styles.searchBarAndCreateButtonContainer}`}>
        <div className={`${styles.searchBar} ${styles.flexRow}`}>
          <i
            className="fa-solid fa-magnifying-glass"
            // onClick={handleSubmit()}
          ></i>
          <input
            className={`${styles.inputFieldContainer}`}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

        <CreateNewCollection
          setCurrent={props.setCurrent}
          id={props.id}
        ></CreateNewCollection>
      </div>
      <div className={`${styles.itemsContainer}`}>{handleSubmit()}</div>
    </div>
  )
}

export default CollectionDropList
