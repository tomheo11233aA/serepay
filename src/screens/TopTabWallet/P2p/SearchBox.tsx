import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from '@commom/Input'
import { colors } from '@themes/colors'
import { useTranslation } from 'react-i18next'

interface Props {
    coin: string
    type?: 'buy' | 'sell'
}

const SearchBox: React.FC<Props> = ({ coin, type }) => {
    const { t } = useTranslation()
    return (
        <View style={{ width: '92%', backgroundColor: 'white', alignSelf: 'center', marginTop: 10, borderRadius: 5 }}>
            <Input
                hint={t(`Search ${coin} amount to ${type === 'buy' ? 'buy' : 'sell'}`)}
                hintColor={colors.black2}
            />
        </View>
    )
}

export default React.memo(SearchBox)

const styles = StyleSheet.create({})