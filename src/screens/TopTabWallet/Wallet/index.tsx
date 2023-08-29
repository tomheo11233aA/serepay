import Box from '@commom/Box'
import Txt from '@commom/Txt'
import React from 'react'
import Coins from './Coins'
import Options from './Options'
import { Button } from 'react-native'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'

const Wallet = () => {
  return (
    <Box flex={1}>
      <Box alignCenter>
        <Txt
          size={16}
          marginTop={10}
          color={'white'}
        >
          Davidpham
        </Txt>
        <Txt color={'white'} size={30} marginTop={10}>
          $1.147.500
        </Txt>
      </Box>
      <Box
        flex={1}
        marginTop={30}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Options />
        <Coins />
        <Button title='abc' onPress={() => navigate(screens.SETTING)} />
      </Box>
    </Box>
  )
}

export default Wallet