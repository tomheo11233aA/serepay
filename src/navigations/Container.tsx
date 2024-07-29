import React from 'react';
import Main from './Main';
import Hello from '@screens/Hello';
import {screens} from '@contants/screens';
import Feedback from '@screens/Card/Feedback';
import QuickLink from '@screens/Card/QuickLink';
import {navigationRef} from '@utils/navigationRef';
import NewCardMore from '@screens/Card/NewCardMore';
import HyperRebate from '@screens/Card/HyperRebate';
import ChangePassword from '@screens/ChangePassword';
import PersonalData from '@screens/Card/PersonalData';
import NewCardDetail from '@screens/Card/NewCardDetail';
import {NavigationContainer} from '@react-navigation/native';
import CommissionRebate from '@screens/Card/CommissionRebate';
import AddProfile from '@screens/Card/PersonalData/AddProfile';
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
          component={ChangePassword}
          name={screens.CHANGE_PASSWORD}
        />
        <Stack.Screen name={screens.FEEDBACK} component={Feedback} />
        <Stack.Screen name={screens.QUICK_LINK} component={QuickLink} />
        <Stack.Screen name={screens.ADD_PROFILE} component={AddProfile} />
        <Stack.Screen name={screens.HYPER_REBATE} component={HyperRebate} />
        <Stack.Screen name={screens.NEW_CARD_MORE} component={NewCardMore} />
        <Stack.Screen name={screens.PERSONAL_DATA} component={PersonalData} />
        <Stack.Screen
          component={CommissionRebate}
          name={screens.COMMISTION_REBATE}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
