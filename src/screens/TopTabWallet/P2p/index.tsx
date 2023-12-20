import Box from '@commom/Box'
import { colors } from '@themes/colors'
import React from 'react'
import BuySellItem from './BuySellItem'
import ChooseCoin from './ChooseCoin'
import Note from './Note'
import BuyCoin from './BuyCoin'
import { useTranslation } from 'react-i18next'
import CoinChoosed from './CoinChoosed'


const P2p = () => {
  const { t } = useTranslation()

  return (
    <Box
      flex={1}
      marginTop={10}
    // backgroundColor={'#edebf0'}
    >
      <CoinChoosed />
      {/* <ChooseCoin />  */}
      <Box
        row
        marginTop={20}
        justifySpaceBetween
        paddingHorizontal={15}
      >

        <BuySellItem
          price={'897,004,995'}
          buttonText={t('Buy now')}
          title={t('Selling price')}
          buttonColor={colors.green}
        />
        <BuySellItem
          buttonColor={colors.red2}
          price={'897,004,995'}
          title={t('Buying price')}
          buttonText={t('Sell now')}
        />
      </Box>
      <Box
        flex={1}
        marginTop={20}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Note t={t} />
        <BuyCoin t={t} />
      </Box>
    </Box>
  )
}

export default P2p