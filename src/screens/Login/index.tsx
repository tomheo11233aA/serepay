import Box from '@commom/Box'
import Safe from '@reuse/Safe'
import { styled } from '@themes/styled'
import React from 'react'
import Header from './Header'
import { colors } from '@themes/colors'
import Scroll from '@commom/Scroll'
import Icon from '@commom/Icon'
import { width } from '@utils/responsive'
import Form from './Form'

const Login = () => {
  return (
    <Box flex={1} backgroundColor={colors.darkViolet}>
      <Safe>
        <Header title={'Login'} />
      </Safe>
      <Scroll flex={1} backgroundColor={'white'}>
        <Box alignCenter>
            <Icon 
              resizeMode={'contain'}
              size={width * 40 / 100}
              tintColor={colors.darkViolet}
              source={require('@images/logo.png')}
            />
            <Form />
        </Box>
      </Scroll>
    </Box>
  )
}

export default Login