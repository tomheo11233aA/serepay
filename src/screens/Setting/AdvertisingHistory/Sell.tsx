import { FlatList, View, Text } from 'react-native'
import React, { useEffect, memo, useState } from 'react'
import LottieView from 'lottie-react-native'
import { colors } from '@themes/colors'
import { ActivityIndicator } from 'react-native'
import AdvertisingItem from './AdvertisingItem'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '@themes/fonts'
import { useAppSelector } from '@hooks/redux'
import { AppDispatch } from '@redux/store/store'
import { useAppDispatch } from '@hooks/redux'
import { getListAdsBuyToUser } from '@utils/userCallApi'
import { getListAdsBuyPenddingToUser } from '@utils/userCallApi'
import { listAdsBuyToUserSelector } from '@redux/selector/userSelector'
import { listAdsBuyPenddingToUserSelector } from '@redux/selector/userSelector'
import { fetchListAdsBuyToUser } from '@redux/slice/advertisingSlice'
import { fetchListAdsBuyPendding } from '@redux/slice/advertisingSlice'
import Safe from '@reuse/Safe'
import Txt from '@commom/Txt'

const Sell = () => {
    const { t } = useTranslation()
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const dispatch: AppDispatch = useAppDispatch()
    const listAdsSellToUser = useAppSelector(listAdsBuyToUserSelector)
    const listAdsSellPenddingToUser = useAppSelector(listAdsBuyPenddingToUserSelector)
    const [fakeLoading, setFakeLoading] = React.useState<boolean>(false)
    
    useEffect(() => {
        dispatch(fetchListAdsBuyToUser())
    }, [])

    useEffect(() => {
        setData(listAdsSellToUser)
    }, [listAdsSellToUser])

    const loadMoreData = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            const response = await getListAdsBuyToUser({
                limit: 10,
                page,
            });
            if (Array.isArray(response?.data?.array)) {
                const newData = response.data.array;
                const isDuplicate = newData.some((item: any) => data.some((item2: any) => item.id === item2.id));
                if (!isDuplicate) {
                    setData(prevData => [...prevData, ...newData]);
                }
                if (newData.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(page + 1);
            setLoading(false);
        }
    };

    const loadMoreDataPending = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            const response = await getListAdsBuyPenddingToUser({
                limit: 10,
                page,
            });
            if (Array.isArray(response?.data?.array)) {
                const newData = response.data.array;
                const isDuplicate = newData.some((item: any) => data.some((item2: any) => item.id === item2.id));
                if (!isDuplicate) {
                    setData(prevData => [...prevData, ...newData]);
                }
                if (newData.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(page + 1);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isChecked) {
            dispatch(fetchListAdsBuyPendding())
            setData(listAdsSellPenddingToUser)
        } else {
            dispatch(fetchListAdsBuyToUser())
        }
    }, [isChecked, listAdsSellPenddingToUser])

    useEffect(() => {
        setFakeLoading(true)
        const timer = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [])

    if (data.length === 0) {
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    marginTop: hp('3.5%'),
                    alignItems: 'center',
                }}>
                    <BouncyCheckbox
                        size={25}
                        fillColor={colors.violet}
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: colors.violet }}
                        onPress={
                            () => {
                                setIsChecked(!isChecked)
                                setData([])
                                setPage(1)
                                setHasMore(true)
                            }
                        }
                        isChecked={isChecked}
                    />
                    <Text style={{ fontFamily: fonts.JR }}>{t('Pending')}</Text>
                </View>
                <LottieView
                    source={require('../../../assets/lottie/searchNodata.json')}
                    autoPlay
                    loop
                    style={{ alignSelf: 'center', width: wp('90%'), height: hp('50%'), marginTop: hp('10%') }}
                />
            </>
        );
    }

    if (fakeLoading) {
        return (
            <Safe backgroundColor='white'>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90%',
                }}>
                    <LottieView
                        source={require('@lottie/loading.json')}
                        style={{
                            width: '50%',
                            height: '50%',
                            alignSelf: 'center',
                        }}
                        autoPlay
                        loop />
                    <Txt size={18} fontFamily={fonts.AS}>Loading...</Txt>
                </View>
            </Safe>
        );
    }
    
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                position: 'absolute',
                marginTop: hp('3.5%'),
                alignItems: 'center',
            }}>
                <BouncyCheckbox
                    size={25}
                    fillColor={colors.violet}
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: colors.violet }}
                    onPress={
                        () => {
                            setIsChecked(!isChecked)
                            setData([])
                            setPage(1)
                            setHasMore(true)
                        }
                    }
                    isChecked={isChecked}
                />
                <Text style={{ fontFamily: fonts.JR }}>{t('Pending')}</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: hp('2%'),
                    marginBottom: hp('30%'),
                }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={isChecked ? loadMoreDataPending : loadMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />}
                renderItem={({ item }) => <AdvertisingItem item={item} side='buy' isPending={isChecked} />}
            />
        </>
    )
}

export default memo(Sell)

