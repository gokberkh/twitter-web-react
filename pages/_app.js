import '../styles/app.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import StoreContext from '../store'

export default function MyApp({ Component, pageProps }) {
  const [theme, themeSet] = useState(null)

  useLayoutEffect(() => {
    const theme = localStorage.getItem('THEME') || 'light'
    themeSet(theme)
  }, [])

  const changeTheme = (theme) => {
    themeSet(theme)
    localStorage.setItem('THEME', theme)
  }

  useEffect(() => {
    if (!theme) return
    const $html = document.querySelector('html')
    $html.classList.remove('light')
    $html.classList.remove('dark')
    $html.classList.remove('dim')
    $html.classList.add(theme)
  }, [theme])

  return (
    <StoreContext.Provider value={{ theme, changeTheme }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}
