import Box from '@commom/Box'
import Txt from '@commom/Txt'
import React from 'react'
import { IOption } from './List'
import Item from './Item'
import { colors } from '@themes/colors'

const SocialNetwork = () => {
  const data: IOption[] = [
    {
      title: 'Help Center',
      icon: require('@images/setting/answer.png')
    },
    {
      title: 'Twitter',
      icon: require('@images/setting/twitter.png')
    },
    {
      title: 'Telegram',
      icon: require('@images/setting/telegram.png')
    },
  ]

  return (
    <Box paddingTop={10}>
      <Txt
        bold
        size={16}
        color={colors.darkViolet}
      >
        Join the community
      </Txt>
      <Box
        style={{
          marginTop: 10,
          borderRadius: 5,
          marginBottom: 20,
          backgroundColor: 'white',
        }}
      >
        {data.map((item) =>
          <Item key={item.title} item={item} />
        )}
      </Box>
    </Box>
  )
}

export default SocialNetwork