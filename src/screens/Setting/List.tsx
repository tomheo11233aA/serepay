import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import Animated from 'react-native-reanimated'
import Item from './Item'

export interface IOption {
  title: string;
  icon: ImageSourcePropType;
}

const List = () => {
  const data: IOption[] = [
    {
      title: 'Ecosystem',
      icon: require('@images/setting/menu.png')
    },
    {
      title: 'Promotion',
      icon: require('@images/setting/gift.png')
    },
    {
      title: 'Listing',
      icon: require('@images/setting/list.png')
    },
    {
      title: 'History',
      icon: require('@images/setting/history.png')
    },
    {
      title: 'Security 12 characters',
      icon: require('@images/unAuth/lock.png')
    },
    {
      title: '2FA Security',
      icon: require('@images/unAuth/lock.png')
    },
    {
      title: 'Change password',
      icon: require('@images/setting/wifi.png')
    },
    {
      title: 'KYC',
      icon: require('@images/setting/security.png')
    },
    {
      title: 'Language',
      icon: require('@images/unAuth/vietnam.png')
    },
  ]

  return (
    <Animated.View
      style={{
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: 'white',
      }}
    >
      {data.map((item) =>
        <Item key={item.title} item={item} />
      )}
    </Animated.View>
  )
}

export default List