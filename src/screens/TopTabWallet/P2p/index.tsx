import Box from '@commom/Box'
import React from 'react'
import ChooseCoin from './ChooseCoin'
import BuySellItem from './BuySellItem'
import { colors } from '@themes/colors'
import Scroll from '@commom/Scroll'
import Fast from './Fast'
import AD from './AD'

const P2p = () => {
  return (
    <Box
      flex={1}
      marginTop={-20}
      backgroundColor={'white'}
      paddingHorizontal={15}
    >
      <Scroll>
        <ChooseCoin />
        <Box row justifySpaceBetween marginTop={20}>
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
        <Fast />
        <AD />
      </Scroll>
    </Box>
  )
}

export default P2p