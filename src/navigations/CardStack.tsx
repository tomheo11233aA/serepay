import React from 'react';
import Card from '@screens/Card';
import {screens} from '@contants/screens';
import NewCardDetail from '@screens/Card/NewCardDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const CardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'ios',
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name={screens.CARD} component={Card} />
    </Stack.Navigator>
  );
};

export default CardStack;
