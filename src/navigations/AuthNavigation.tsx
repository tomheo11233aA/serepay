import { screens } from '@contants/screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import WalletStack from './WalletStack'

const Tab = createBottomTabNavigator()

const AuthNavigation = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name={screens.WALLET_STACK} component={WalletStack} />
    </Tab.Navigator>
  )
}

export default AuthNavigation
    