import React from 'react'
import styles from '../SocialMediaButton/SocialMediaButton.module.css'

const SocialMediaButton = props => {
  // const link = encodeURI('https://youtu.be/w8vPZrMFiZ4') //
  const link = encodeURI(props.link) //de link recipe dzo trong day nha
  const msg = encodeURIComponent('YUMMY RECIPE FOR YOU TO EAT SON')
  const title = encodeURIComponent('YUMMY RECIPE FOR FAT ASS HOOMAN')

  const fbLink = `https://www.facebook.com/share.php?u=${link}`
  const twitterLink = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=recipe`
  const redditLink = `http://www.reddit.com/submit?url=${link}&title=${title}`

  return (
    <div className={styles.shareContainer}>
      <div id="share-buttons" className={styles.shareButtons}>
        <a href={fbLink} className={styles.facebook} target="blank">
          <i className="fab fa-facebook"></i>
        </a>
        <a href={twitterLink} className={styles.twitter} target="blank">
          <i className="fab fa-twitter"></i>
        </a>
        <a href={redditLink} className={styles.reddit} target="blank">
          <i className="fab fa-reddit"></i>
        </a>
      </div>
    </div>
  )
}

export default SocialMediaButton
