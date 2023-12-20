import Container from '@navigations/Container'
import React from 'react'
import Animated from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <Animated.View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <Container />
        </PaperProvider>
      </SafeAreaProvider>
    </Animated.View>
  )
}

export default App