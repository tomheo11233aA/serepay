import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Swap from '@screens/Swap'
import React from 'react'

const Stack = createNativeStackNavigator()

const SwapStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation: 'ios'
            }}>
            <Stack.Screen name={screens.SWAP} component={Swap} />
        </Stack.Navigator>
    )
}

export default SwapStack