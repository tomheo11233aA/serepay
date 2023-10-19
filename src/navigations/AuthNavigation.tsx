import { screens } from '@contants/screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import WalletStack from './WalletStack'
import SwapStack from './SwapStack'
import SettingStack from './SettingStack'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { colors } from '@themes/colors'
import Txt from '@commom/Txt'
import ADStack from './ADStack'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()

const AuthNavigation = () => {
  const { t } = useTranslation()
  const tabs = [
    {
      sizeIcon: 25,
      title: 'Wallet',
      component: WalletStack,
      name: screens.WALLET_STACK,
      icon: require('@images/tab/wallet.png'),
      icon2: require('@images/tab/wallet2.png'),
    },
    {
      sizeIcon: 20,
      title: 'Tobe Ads',
      component: ADStack,
      name: screens.AD_STACK,
      icon: require('@images/tab/menu.png'),
      icon2: require('@images/tab/menu2.png'),
    },
    {
      sizeIcon: 20,
      title: 'Swap',
      component: SwapStack,
      name: screens.SWAP_STACK,
      icon: require('@images/tab/swap.png'),
      icon2: require('@images/tab/swap2.png'),
    },
    {
      sizeIcon: 20,
      title: 'Setting',
      component: SettingStack,
      name: screens.SETTING_STACK,
      icon: require('@images/tab/setting.png'),
      icon2: require('@images/tab/setting2.png'),
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
          borderTopWidth: 1,
          backgroundColor: '#f8f8f8',
          position: 'absolute',
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
                      marginBottom={5}
                      size={tab.sizeIcon}
                      source={focused ? tab.icon : tab.icon2}
                      resizeMode={'contain'}
                    />
                    <Txt
                      size={12}
                      color={focused ? colors.violet : 'black'}
                    >
                      {t(tab.title)}
                    </Txt>
                  </Box>
                )
              }
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default AuthNavigation
