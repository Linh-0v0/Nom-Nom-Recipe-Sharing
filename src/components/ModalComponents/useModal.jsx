import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)
  const [ndIsShowing, setNdIsShowing] = useState(false)

  function toggle () {
    setIsShowing(!isShowing)
  }

  function secondToggle () {
    setNdIsShowing(!ndIsShowing)
  }

  return {
    isShowing,
    ndIsShowing,
    toggle,
    secondToggle
  }
}

export default useModal
