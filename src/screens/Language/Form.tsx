import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { screens } from '@contants/screens'
import { useAppSelector } from '@hooks/redux'
import { languageUserSelector } from '@redux/selector/userSelector'
import { colors } from '@themes/colors'
import { navigate } from '@utils/navigationRef'
import React from 'react'
import { StyleSheet } from 'react-native'

const Form = () => {
  const language = useAppSelector(languageUserSelector)
  return (
    <Box width={'100%'} marginBottom={100}>
      <Box
        row
        radius={7}
        alignCenter
        width={'100%'}
        justifySpaceBetween
        padding={10}
        backgroundColor={'white'}
      >
        <Box row alignCenter>
          <Icon
            size={30}
            marginRight={10}
            source={language.image}
          />
          <Txt size={15}>{language.title}</Txt>
        </Box>
        <Icon
          size={25}
          marginRight={10}
          source={require('@images/unAuth/refresh.png')}
        />
      </Box>

      <Box
        row
        alignCenter
        marginTop={20}
        justifySpaceBetween
      >
        <Btn
          style={styles.button}
          onPress={() => navigate(screens.LOGIN)}
        >
          <Txt style={styles.textButton}>LOGIN</Txt>
        </Btn>
        <Btn
          style={styles.button}
          onPress={() => navigate(screens.REGISTER)}
        >
          <Txt style={styles.textButton}>REGISTER</Txt>
        </Btn>
      </Box>

      <Btn alignSelf={'center'}>
        <Txt color={colors.violet} bold marginTop={20}>
          Email active again?
        </Txt>
      </Btn>
    </Box>
  )
}

export default Form

const styles = StyleSheet.create({
  button: {
    width: '45%',
    borderRadius: 30,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  textButton: {
    fontWeight: 'bold',
    color: colors.darkViolet,
  },
})