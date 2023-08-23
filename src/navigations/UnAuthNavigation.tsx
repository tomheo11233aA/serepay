import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/Login'
import React from 'react'

const Stack = createNativeStackNavigator()

const UnAuthNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name={screens.LOGIN} component={Login} />
    </Stack.Navigator>
  )
}

export default UnAuthNavigation