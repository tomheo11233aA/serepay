import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Wallet from '@screens/Wallet'
import React from 'react'

const Stack = createNativeStackNavigator()

const WalletStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.WALLET} component={Wallet} />
        </Stack.Navigator>
    )
}

export default WalletStack