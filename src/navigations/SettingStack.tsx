import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Setting from '@screens/Setting'
import React from 'react'

const Stack = createNativeStackNavigator()

const SettingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.SETTING} component={Setting} />
        </Stack.Navigator>
    )
}

export default SettingStack