import styles from '../../styles/UserProfile/UserProfileMainPage.module.css'

export const UpdateButton = ({ fn, className, style, option }) => {
  return (
    <button
      type="button"
      style={style}
      onClick={fn}
      className={`${styles.updateDeleteButton} ${className}`}
    >
      {option}
    </button>
  )
}
