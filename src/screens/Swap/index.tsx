import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, {useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Tab from './Tab'
import MakePrice from './MakePrice'
import { useTranslation } from 'react-i18next'


const Swap = () => {
  const { t } = useTranslation()
  return (
    <LinearGradient
      style={{ flex: 1 }}
      end={{ x: 1, y: 0.5 }}
      start={{ x: 0, y: 0.5 }}
      colors={[colors.darkViolet, colors.violet]}
    >
      <Box
        flex={1}
        marginTop={60}
        paddingHorizontal={15}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Box
          row
          alignCenter
          paddingTop={10}
        >
          <Icon
            size={25}
            source={require('@images/unAuth/left.png')}
          />
          <Txt bold color={colors.violet} size={18}>
            {`  ${t('SWAP')}`}
          </Txt>
        </Box>
        <Box paddingHorizontal={10}>
          <Tab t={t} />
        </Box>
      </Box>
    </LinearGradient>
  )
}

export default Swap