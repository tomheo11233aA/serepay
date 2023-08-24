import { screens } from '@contants/screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import WalletStack from './WalletStack'
import PageStack from './PageStack'
import SwapStack from './SwapStack'
import SettingStack from './SettingStack'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { colors } from '@themes/colors'
import Txt from '@commom/Txt'

const Tab = createBottomTabNavigator()

const AuthNavigation = () => {
  const tabs = [
    {
      title: 'Wallet',
      component: WalletStack,
      name: screens.WALLET_STACK,
      icon: require('@images/tab/wallet.png'),
    },
    {
      title: 'Page',
      component: PageStack,
      name: screens.PAGE_STACK,
      icon: require('@images/tab/page.png'),
    },
    {
      title: 'Swap',
      component: SwapStack,
      name: screens.SWAP_STACK,
      icon: require('@images/tab/arrow.png'),
    },
    {
      title: 'Setting',
      component: SettingStack,
      name: screens.SETTING_STACK,
      icon: require('@images/tab/settings.png'),
    },
  ]

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
          borderTopWidth: 0,
          backgroundColor: colors.darkViolet,
        }
      }}
    >
      {tabs.map((tab) => {
        return (
          <Tab.Screen
            key={tab.title}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }: { focused: boolean }): JSX.Element => {
                return (
                  <Box alignCenter>
                    <Icon
                      size={20}
                      marginBottom={5}
                      source={tab.icon}
                      tintColor={'white'}
                    />
                    {focused && <Txt color={'white'}>{tab.title}</Txt>}
                  </Box>
                )
              }
            }}
          />
        )
      })}
      {/* <Tab.Screen name={screens.WALLET_STACK} component={WalletStack} />
        <Tab.Screen name={screens.PAGE_STACK} component={PageStack} />
        <Tab.Screen name={screens.SWAP_STACK} component={SwapStack} />
        <Tab.Screen name={screens.SETTING_STACK} component={SettingStack} /> */}
    </Tab.Navigator>
  )
}

export default AuthNavigation
