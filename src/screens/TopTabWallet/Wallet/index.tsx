import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import Coins from './Coins'

const Wallet = () => {
  const options = [
    {
      title: 'Send',
      icon: require('@images/wallet/upload.png'),
    },
    {
      title: 'Receive',
      icon: require('@images/wallet/download.png'),
    },
    {
      title: 'Swap',
      icon: require('@images/wallet/swap.png'),
    },
  ]

  return (
    <Box flex={1}>
      <Box alignCenter>
        <Txt color={'white'} bold size={25}>0 $</Txt>
        <Txt
          bold
          marginTop={30}
          color={'white'}
        >
          Vipfeeen
        </Txt>
        <Box
          row
          alignCenter
          width={'90%'}
          marginTop={30}
          justifySpaceAround
        >
          {options.map((option) =>
            <Btn key={option.title}>
              <Box
                width={40}
                height={40}
                radius={50}
                alignCenter
                justifyCenter
                backgroundColor={colors.violet}
              >
                <Icon
                  size={20}
                  tintColor={'white'}
                  source={option.icon}
                />
              </Box>
              <Txt color={'white'} marginTop={10}>
                {option.title}
              </Txt>
            </Btn>
          )}
        </Box>
      </Box>
      <Coins />
    </Box>
  )
}

export default Wallet