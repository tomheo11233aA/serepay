import Container from '@navigations/Container'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <Container />
    </SafeAreaProvider>
  )
}

export default App