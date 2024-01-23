import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TopTabWallet from '@screens/TopTabWallet'
import React from 'react'
import CreateBuyAds from '@screens/TopTabWallet/Wallet/CreateBuyAds'
import CreateSellAds from '@screens/TopTabWallet/Wallet/CreateSellAds'

const Stack = createNativeStackNavigator()
const WalletStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation: 'ios'
            }}>
            <Stack.Screen name={screens.TOP_TAB_WALLET} component={TopTabWallet} />
            <Stack.Screen name={screens.CREATE_BUY_ADS} component={CreateBuyAds} />
            <Stack.Screen name={screens.CREATE_SELL_ADS} component={CreateSellAds} />
        </Stack.Navigator>
    )
}

export default WalletStack