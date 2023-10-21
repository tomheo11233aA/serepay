import Container from '@navigations/Container'
import React from 'react'
import Animated from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <Animated.View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Container />
      </SafeAreaProvider>
    </Animated.View>
  )
}

export default App