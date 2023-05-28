import styles from '../../../styles/UserProfile/UserProfileMainPage.module.css'
import UpdateAvatar from '../UpdateAvatar'
import { UserProfileDetail } from './UserProfileDetail'
import { UserProfileTab } from './UserProfileTab'
import StickyBox from 'react-sticky-box'
const UserProfileSide = props => {
  return (
    <StickyBox offsetTop={20} offsetBottom={0}>
      <div
        className={`${styles.userProfileSideMainContainer} ${styles.flexColumn}`}
      >
        <UserProfileDetail></UserProfileDetail>

        <div className={`${styles.tabContainer} ${styles.flexRow}`}>
          <UserProfileTab
            name={'My collection'}
            id={1}
            setDisplay={props.setDisplay}
          />
          <UserProfileTab
            name={'My recipe'}
            id={2}
            setDisplay={props.setDisplay}
          />
        </div>
      </div>
    </StickyBox>
  )
}

export default UserProfileSide
