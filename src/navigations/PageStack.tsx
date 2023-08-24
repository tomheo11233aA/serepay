import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Page from '@screens/Page'
import React from 'react'

const Stack = createNativeStackNavigator()

const PageStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.PAGE} component={Page} />
        </Stack.Navigator>
    )
}

export default PageStack