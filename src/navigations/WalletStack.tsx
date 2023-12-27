import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TopTabWallet from '@screens/TopTabWallet'
import React from 'react'
import Transaction from '@screens/TopTabWallet/P2p/Transaction'
import ConfirmTransaction from '@screens/TopTabWallet/P2p/ConfirmTransaction'
const Stack = createNativeStackNavigator()
// sửa
const WalletStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.TOP_TAB_WALLET} component={TopTabWallet} />
            <Stack.Screen name={screens.TRANSACTION} component={Transaction} />
            <Stack.Screen name={screens.CONFIRM_TRANSACTION} component={ConfirmTransaction} />
        </Stack.Navigator>
    )
}

export default WalletStack