import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.css'
import { DefaultButton } from './Button'
import RenderLabel from './RecipeDetailPageComponents/RecipeDetailSection/RenderLabel'
import { useState } from 'react'

const NavBar = props => {
  // export function DefaultButton({fn, options, type, style, className})

  const style = {
    backgroundColor: '',
    color: 'black',
    backgroundColorHover: 'rgba(255, 196, 131, 1)',
    colorHover: 'black'
  }

  const styleActive = {
    backgroundColor: 'rgba(255, 196, 131, 1)',
    color: 'black',
    backgroundColorHover: 'rgba(255, 196, 131, 1)',
    colorHover: 'black'
  }

  const handleClick = tab => {
    tab.active = true
    window.location.href = tab.link
  }

  const items = props.tabList.map(tab => (
    <li key={tab.key}>
      <DefaultButton
        options={tab.name}
        type={'button'}
        style={tab.active ? styleActive : style}
        className={''}
        fn={() => handleClick(tab)}
      />
    </li>
  ))

  return (
    <>
      <nav className={`${styles.navBar} ${styles.flexItemCenter}`}>
        <ul className={`${styles.flexItemCenter}`}>{items}</ul>
        {/* TODO Make items clickable */}
      </nav>
    </>
  )
}

export default NavBar
