import { Text, View, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import Input from '@commom/Input'
import { colors } from '@themes/colors'
import { useTranslation } from 'react-i18next'
import { searchBuyQuick, searchSellQuick } from '@utils/userCallApi'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'
import { roundDecimalValues } from '../../../helper/function/roundCoin'
import { debounce } from 'lodash'

interface Props {
    coin: string
    type?: 'buy' | 'sell'
}

const SearchBox: React.FC<Props> = ({ coin, type }) => {
    const { t } = useTranslation()
    const [amount, setAmount] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const searchFunction = type === 'buy' ? searchBuyQuick : searchSellQuick

    const params = useMemo(() => ({
        limit: 10,
        page: 1,
        symbol: coin,
        amount: amount
    }), [amount, coin])

    const debouncedSearch = useMemo(() => debounce((params) => {
        if (searchFunction) {
            searchFunction(params)?.then(response => {
                setData(response.data.array)
                setLoading(false)
            })
                .catch(error => {
                    Alert.alert('Error', error.message)
                    setLoading(false)
                })
        } else {
            setData([])
            setLoading(false)
        }
    }, 500), [searchFunction]);

    useEffect(() => {
        if (amount) {
            setLoading(true)
            debouncedSearch(params);
        }
    }, [amount, coin, type, debouncedSearch])

    const handleItemClick = async (item: any) => {
        try {
            await AsyncStorage.setItem('adsItem', JSON.stringify(item))
            navigate(screens.TRANSACTION)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ width: '92%', backgroundColor: 'white', alignSelf: 'center', marginTop: 10, borderRadius: 5 }}>
            <Input
                height={40}
                hint={t(`Search ${coin} amount to ${type === 'buy' ? 'buy' : 'sell'}`)}
                onChangeText={setAmount}
                value={amount}
                hintColor={colors.black2}
                iconTwo={require('../../../assets/images/setting/search.png')}
                sizeIcon={18}
                flex={1}
                borderBottomWidth={1}
            />
            {loading ? (
                <LottieView
                    source={require('../../../assets/lottie/loading.json')}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                />
            ) : data.length > 0 ? (
                data.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleItemClick(item)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderBottomWidth: 0.5, borderBottomColor: colors.black2 }}>
                            <Text>{type === 'buy' ? t('Seller') : t('Buyer')}: {item.userName}</Text>
                            <Text> {t('Available')}:{roundDecimalValues(item.amount - item.amountSuccess, 10001)}</Text>
                            <Text> {t('Min')}:{item.amountMinimum}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <LottieView
                    source={require('../../../assets/lottie/searchNodata.json')}
                    autoPlay
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                />
            )}
        </View>
    )
}

export default React.memo(SearchBox)
