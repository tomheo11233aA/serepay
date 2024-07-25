import React from 'react';
import Main from './Main';
import Hello from '@screens/Hello';
import {screens} from '@contants/screens';
import {navigationRef} from '@utils/navigationRef';
import ChangePassword from '@screens/ChangePassword';
import NewCardDetail from '@screens/Card/NewCardDetail';
import {NavigationContainer} from '@react-navigation/native';
import Transaction from '@screens/TopTabWallet/P2p/Transaction';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmTransaction from '@screens/TopTabWallet/P2p/ConfirmTransaction';

const Stack = createNativeStackNavigator();
const Container = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screens.HELLO} component={Hello} />
        <Stack.Screen name={screens.MAIN} component={Main} />
        <Stack.Screen name={screens.TRANSACTION} component={Transaction} />
        <Stack.Screen
          name={screens.NEW_CARD_DETAIL}
          component={NewCardDetail}
        />
        <Stack.Screen
          name={screens.CONFIRM_TRANSACTION}
          component={ConfirmTransaction as React.FC}
        />
        <Stack.Screen
          name={screens.CHANGE_PASSWORD}
          component={ChangePassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
