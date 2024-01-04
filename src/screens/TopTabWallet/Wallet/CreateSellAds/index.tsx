import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Safe from '@reuse/Safe'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '@themes/colors'
import Box from '@commom/Box'
import { goBack } from '@utils/navigationRef'
import Txt from '@commom/Txt'
import Icon from '@commom/Icon'
import { useTranslation } from 'react-i18next'
import Btn from '@commom/Btn'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'

const CreateSellAds = () => {
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
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon
                            size={25}
                            source={require('@images/unAuth/left.png')}
                        />
                    </TouchableOpacity>
                    <Txt bold color={colors.violet} size={18}>
                        {`${t('Create new sell advertisement')}`}
                    </Txt>
                </Box>
                <Safe flex={1}>
                    <Txt onPress={() =>navigate(screens.CREATE_BUY_ADS)}>{t('Do you want to buy ?')}</Txt>
                </Safe>
            </Box>
        </LinearGradient>
    )
}

export default CreateSellAds

const styles = StyleSheet.create({})