import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Language from '@screens/Language'
import Login from '@screens/Login'
import ForgotPassword from '@screens/ForgotPassword'
import Register from '@screens/Register'
import React from 'react'

const Stack = createNativeStackNavigator()

const UnAuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.LANGUAGE} component={Language} />
      <Stack.Screen name={screens.LOGIN} component={Login} />
      <Stack.Screen name={screens.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={screens.REGISTER} component={Register} />
    </Stack.Navigator>
  )
}

export default UnAuthNavigation