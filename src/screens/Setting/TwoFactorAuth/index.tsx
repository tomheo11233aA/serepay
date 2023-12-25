import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TurnOn2FA from './TurnOn2FA'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TurnOff2FA from './TurnOff2FA'
import { TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'

const TwoFactorAuth = () => {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = React.useState(true)
    const [isTwoFA, setIsTwoFA] = React.useState(0)
    React.useEffect(() => {
        const fetchTwoFA = async () => {
            const isTwoFA = await AsyncStorage.getItem('isTwoFA')
            setIsTwoFA(Number(isTwoFA))
            setIsLoading(false)
        }
        fetchTwoFA()
    }, [])

    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }} />
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
                    <TouchableOpacity onPress={() => {
                        navigate(screens.SETTING)
                    }}>
                        <Icon
                            size={25}
                            source={require('@images/unAuth/left.png')}
                        />
                    </TouchableOpacity>
                    <Txt bold color={colors.violet} size={18}>
                        {`  ${t('TWO FACTOR AUTHENTICATION')}`}
                    </Txt>
                </Box>
                <Box
                    marginTop={30}
                    paddingHorizontal={15}
                >
                    {!isLoading && (isTwoFA === 1 ? <TurnOff2FA /> : <TurnOn2FA />)}
                </Box>
            </Box>
        </LinearGradient>
    )
}

export default TwoFactorAuth