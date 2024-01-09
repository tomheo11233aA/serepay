import React, { useEffect } from 'react'
import Safe from '@reuse/Safe'
import Scroll from '@commom/Scroll'
import { FlatList } from 'react-native'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { IGetListBankingUser } from '@models/BANKING/getListBankingUser'
import { getListBanking } from '@utils/userCallApi'
import { navigate } from '@utils/navigationRef'
import Btn from '@commom/Btn'
import LottieView from 'lottie-react-native'
import { useTranslation } from 'react-i18next'
import CreditCardForm from './CreditCardForm'

const CurrentBank = () => {
    const { t } = useTranslation()
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    useEffect(() => {
        const getListBankingUser = async () => {
            const data: IGetListBankingUser = {
                limit: 5,
                page: 1,
            }
            try {
                setIsLoading(true);
                const response = await getListBanking(data);
                setData(response?.data.array);
            } catch (error: any) {
                setIsLoading(false);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        getListBankingUser();
    }, [])
    if (data.length === 0) {
        return (
            <Safe flex={1} backgroundColor={'white'}>
                <Txt
                    size={20}
                    color={'black'}
                    marginTop={20}
                >
                    {t('Your List Bank is empty')}
                </Txt>
                <LottieView
                    source={require('@lottie/nodataanimation.json')}
                    autoPlay
                    loop
                    style={{
                        width: 300,
                        height: 300,
                        alignSelf: 'center',
                        marginTop: 50
                    }}
                />
            </Safe>
        )
    }

    if (isLoading) {
        return (
            <Safe flex={1} backgroundColor={'white'}>
                <LottieView
                    source={require('@lottie/loading.json')}
                    autoPlay
                    loop
                    style={{
                        width: 300,
                        height: 300,
                        alignSelf: 'center',
                        marginTop: 50
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
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    renderItem={({ item }) => <CreditCardForm item={item} />}
                />
        </Safe>
    )
}

export default CurrentBank
