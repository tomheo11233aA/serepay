import {View, Text} from 'react-native';
import VIP from './VIP';
import Agent from './Agent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {screens} from '@contants/screens';
import {colors} from '@themes/colors';
import {fonts} from '@themes/fonts';
import {width} from '@utils/responsive';
import Box from '@commom/Box';
import {ArrowLeft2} from 'iconsax-react-native';
import Btn from '@commom/Btn';
import {goBack} from '@utils/navigationRef';

const Tab = createMaterialTopTabNavigator();
const CommissionRebateTab = () => {
  const tabs = [
    {
      title: 'VIP',
      component: VIP,
      name: screens.VIP,
    },
    {
      title: 'Agent',
      component: Agent,
      name: screens.AGENT,
    },
  ];
  return (
    <Box>
      <Btn absolute top={10} padding={5} zIndex={1} onPress={() => goBack()}>
        <ArrowLeft2 color={'#000'} size={20} />
      </Btn>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: colors.gray,
          tabBarIndicatorStyle: {backgroundColor: 'transparent'},
          tabBarStyle: {
            marginLeft: 20,
            marginBottom: 10,
            width: width * 0.5,
            backgroundColor: '#fff',
            shadowColor: 'transparent',
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: fonts.OSB,
            textTransform: 'capitalize',
          },
        }}
        initialRouteName={screens.AGENT}>
        {tabs.map((item, index) => {
          return (
            <Tab.Screen
              key={item.title}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Tab.Navigator>
    </Box>
  );
};
export default CommissionRebateTab;
