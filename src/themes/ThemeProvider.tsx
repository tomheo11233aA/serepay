import React, { createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { colors } from './colors'

export const ThemeContext = createContext({
  dark: false,
  theme: colors.light,
  setScheme: (scheme: string) => { },
})

export const ThemeProvider = (props: any) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === 'dark')

  const defaultTheme = {
    dark: isDark,
    theme: isDark ? colors.dark : colors.light,
    setScheme: (scheme: string) => setIsDark(scheme === 'dark')
  }

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)