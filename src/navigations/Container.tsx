import { screens } from '@contants/screens'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Hello from '@screens/Hello'
import { navigationRef } from '@utils/navigationRef'
import React from 'react'
import Main from './Main'
import TwoFactorAuth from '@screens/Setting/TwoFactorAuth'
import Transaction from '@screens/TopTabWallet/P2p/Transaction'
import ConfirmTransaction from '@screens/TopTabWallet/P2p/ConfirmTransaction'

const Stack = createNativeStackNavigator()

const Container = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={screens.HELLO} component={Hello} />
                <Stack.Screen name={screens.MAIN} component={Main} />
                <Stack.Screen name={screens.TWO_FACTOR_AUTHENTICATION} component={TwoFactorAuth} />
                <Stack.Screen name={screens.TRANSACTION} component={Transaction} />
                <Stack.Screen name={screens.CONFIRM_TRANSACTION} component={ConfirmTransaction as React.FC} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Container