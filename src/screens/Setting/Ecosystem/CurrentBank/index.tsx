import React, { useEffect, useState } from 'react'
import Safe from '@reuse/Safe'
import { FlatList, ActivityIndicator } from 'react-native'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { getListBanking } from '@utils/userCallApi'
import LottieView from 'lottie-react-native'
import { useTranslation } from 'react-i18next'
import CreditCardForm from './CreditCardForm'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const CurrentBank = () => {
    const { t } = useTranslation()
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);


    const loadMoreData = async () => {
        if (!loading && hasMore) {
            setIsLoading(true);
            setLoading(true);
            const response = await getListBanking({
                limit: 5,
                page,
            });
            if (Array.isArray(response?.data?.array)) {
                setData(prevData => [...prevData, ...response.data.array]);
                console.log(response?.data?.array?.length)
                if (response.data.array.length === 0) {
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
        loadMoreData();
    }, [])


    if (data.length === 0) {
        return (
            <Safe flex={1} backgroundColor={'white'}>
                <Txt
                    size={20}
                    color={'black'}
                    marginTop={20}
                    center
                    fontFamily={fonts.FSCR}
                >
                    {t('Your List Bank is empty')}
                </Txt>
                <LottieView
                    source={require('@lottie/searchNodata.json')}
                    autoPlay
                    loop
                    style={{
                        flex: 1,
                        marginBottom: hp('10%'),
                    }}
                    
                />
            </Safe>
        )
    }

    return (
        <Safe flex={1} backgroundColor={'white'}>
            <Txt
                size={20}
                color={'black'}
                marginTop={20}
                center
                fontFamily={fonts.FSCR}
            >
                {t('Your List of Banks')}
            </Txt>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: hp('2%'),
                    marginBottom: hp('7%'),
                }}
                keyExtractor={(item, index) => index.toString()}
                data={data}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />}
                renderItem={({ item }) => <CreditCardForm item={item} />}
            />
        </Safe>
    )
}

export default CurrentBank
