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
import { debounce } from 'lodash'
import Txt from '@commom/Txt'
import { fonts } from '@themes/fonts'
import { coinListSelector } from '@redux/selector/userSelector'
import { useAppSelector } from '@hooks/redux'
import { selectedRateSelector } from '@redux/selector/userSelector'

interface Props {
    coin: string
    type?: 'buy' | 'sell'
}

const SearchBox: React.FC<Props> = ({ coin, type }) => {
    const { t } = useTranslation()
    const [amount, setAmount] = useState<any>()
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const searchFunction = type === 'sell' ? searchSellQuick : searchBuyQuick
    const coinList = useAppSelector(coinListSelector)
    const coinData = useMemo(() => coinList.find(item => item.name === coin), [coinList, coin]);
    const selectedRate = useAppSelector(selectedRateSelector)
    const [isEnterWithSelectedRate, setIsEnterWithSelectedRate] = useState(false)
    const [isEnterWithCoin, setIsEnterWithCoin] = useState(true)
    const handleAmountChange = (value: number) => {
        if (isEnterWithSelectedRate && selectedRate && coinData) {
            setAmount(Number(value) / selectedRate.rate / coinData.price)
        }
        if (isEnterWithCoin && coinData) {
            setAmount(Number(value))
        }
    }
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
                    Alert.alert(t('Error'), t('Something went wrong'))
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
            await AsyncStorage.setItem('myAmount', amount?.toString() ?? '')
            navigate(screens.TRANSACTION)
        } catch (error) {
            Alert.alert(t('Error'), t('Something went wrong'))
        }
    }

    return (
        <View style={{ width: '92%', backgroundColor: 'white', alignSelf: 'center', marginTop: 10, borderRadius: 5 }}>
            <Input
                height={40}
                hint={isEnterWithSelectedRate ? t(`Search amount of money to ${type === 'buy' ? 'buy' : 'sell'} ${coin}`) : t(`Search ${coin} amount to ${type === 'buy' ? 'buy' : 'sell'}`)}
                value={amount}
                onChangeText={handleAmountChange}
                hintColor={colors.black2}
                iconTwo={require('../../../assets/images/setting/search.png')}
                sizeIcon={18}
                flex={1}
                borderBottomWidth={1}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <TouchableOpacity
                    style={{ backgroundColor: isEnterWithSelectedRate ? colors.violet : colors.black3, padding: 10, borderRadius: 5, }}
                    onPress={() => {
                        setIsEnterWithSelectedRate(true);
                        setIsEnterWithCoin(false);
                    }}
                >
                    <Txt
                        size={14}
                        fontFamily={fonts.OSB}
                        color={'white'}
                        center
                    >
                        {t('Enter with') + ' ' + selectedRate?.title}
                    </Txt>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: isEnterWithCoin ? colors.violet : colors.black3, padding: 10, borderRadius: 5 }}
                    onPress={() => {
                        setIsEnterWithSelectedRate(false);
                        setIsEnterWithCoin(true);
                    }}
                >
                    <Txt
                        size={14}
                        fontFamily={fonts.OSB}
                        color={'white'}
                        center
                    >
                        {t('Enter with') + ' ' + coin}
                    </Txt>
                </TouchableOpacity>
            </View>
            {loading ? (
                <LottieView
                    source={require('@lottie/loading.json')}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                />
            ) : data.length > 0 ? (
                data.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleItemClick(item)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, flexWrap: 'wrap', borderBottomWidth: 0.5, borderBottomColor: colors.gray5 }}>
                            <Text>{type === 'buy' ? t('Seller') : t('Buyer')}: {item.userName}</Text>
                            <Text> {t('Available')}:{(item.amount - item.amountSuccess)}</Text>
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
