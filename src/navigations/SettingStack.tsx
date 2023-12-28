import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Setting from '@screens/Setting'
import React from 'react'
import TurnOn2FA from '@screens/Setting/TwoFactorAuth/TurnOn2FA'
import KYCScreen from '@screens/Setting/KYC'
import Verify2FA from '@screens/Setting/TwoFactorAuth/Verify2FA'
import Ecosystem from '@screens/Setting/Ecosystem/Ecosystem'
import History from '@screens/Setting/History'
import Advertising from '@screens/Setting/AdvertisingHistory'

const Stack = createNativeStackNavigator()

const SettingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.SETTING} component={Setting} />
            <Stack.Screen name={screens.TURN_ON_2FA} component={TurnOn2FA} />
            <Stack.Screen name={screens.VERIFY2FA} component={Verify2FA} />
            <Stack.Screen name={screens.KYC} component={KYCScreen} />
            <Stack.Screen name={screens.ECOSYSTEM} component={Ecosystem} />
            <Stack.Screen name={screens.HISTORY_TRANSACTION} component={History} />
            <Stack.Screen name={screens.ADVERTISING_HISTORY} component={Advertising} />
        </Stack.Navigator>
    )
}

export default SettingStack