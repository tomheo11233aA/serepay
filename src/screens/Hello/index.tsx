import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { screens } from '@contants/screens'
import { colors } from '@themes/colors'
import { navigate } from '@utils/navigationRef'
import { width } from '@utils/responsive'
import React, { useEffect } from 'react'

const Hello = () => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate(screens.MAIN)
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <Box
      flex={1}
      alignCenter
      justifyCenter
      backgroundColor={colors.darkViolet}
    >
      <Icon 
        resizeMode={'contain'}
        source={require('@images/logo.png')}
        size={width * 40 / 100}
      />
    </Box>
  )
}

export default Hello