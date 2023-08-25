import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AD from '@screens/AD'
import React from 'react'

const Stack = createNativeStackNavigator()

const ADStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.AD} component={AD} />
        </Stack.Navigator>
    )
}

export default ADStack