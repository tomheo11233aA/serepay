import Icon from '@commom/Icon'
import { screens } from '@contants/screens'
import TextLogo from '@reuse/TextLogo'
import { navigate } from '@utils/navigationRef'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Hello = () => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate(screens.MAIN)
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <LinearGradient
      colors={['#0a717a', '#047f7c', '#02a579']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        size={90}
        resizeMode={'contain'}
        source={require('@images/logo.png')}
        marginBottom={-10}
      />
      <TextLogo />
    </LinearGradient>
  )
}

export default Hello