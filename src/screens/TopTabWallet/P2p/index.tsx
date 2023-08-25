import Box from '@commom/Box'
import { colors } from '@themes/colors'
import React from 'react'
import BuySellItem from './BuySellItem'
import ChooseCoin from './ChooseCoin'
import Note from './Note'
import BuyCoin from './BuyCoin'

const P2p = () => {
  return (
    <Box flex={1} backgroundColor={'#edebf0'} marginTop={-20}>
      <ChooseCoin />
      <Box
        row
        marginTop={20}
        justifySpaceBetween
        paddingHorizontal={15}
      >

        <BuySellItem
          price={'897,004,995'}
          buttonText={'Buy now'}
          title={'Selling price'}
          buttonColor={colors.green}
        />
        <BuySellItem
          buttonColor={'red'}
          price={'897,004,995'}
          title={'Buying price'}
          buttonText={'Sell now'}
        />
      </Box>
      <Box
        flex={1}
        marginTop={20}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Note />
        <BuyCoin />
      </Box>
    </Box>
  )
}

export default P2p