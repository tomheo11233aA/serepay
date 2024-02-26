import React, { useState, useCallback, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import Safe from '@reuse/Safe';
import Wallet from './Wallet';
import P2p from './P2p';
import Staking from './Staking';
import Lending from './Lending';
import { colors } from '@themes/colors';
import LottieView from 'lottie-react-native';
import { navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import { useAppSelector } from '@hooks/redux';
import { notificationSelector } from '@redux/selector/userSelector';
import { useAppDispatch } from '@hooks/redux';
import { AppDispatch } from '@redux/store/store';
import { setCount } from '@redux/slice/notificationSlice';
import { socket } from '@helper/AxiosInstance';
import { getListHistoryP2pPendding } from '@utils/userCallApi';

const TopTabWallet = () => {
    const { t } = useTranslation()
    const dispatch: AppDispatch = useAppDispatch()
    const notification = useAppSelector(notificationSelector)
    const [tabChoosed, setTabChoosed] = useState<string>('WALLET')
    const tabs = ['WALLET', 'P2P', 'STAKING', 'LENDING']

    useEffect(() => {
        dispatch(setCount(notification))
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const response = await getListHistoryP2pPendding({
                limit: 1000,
                page: 1,
            });
            if (response?.status) {
                dispatch(setCount(notification + response?.data?.total ?? 0));
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        socket.on("createP2p", (res) => {
            dispatch(setCount(notification + 1));
        });
        socket.on("operationP2p", (idP2p) => {
            dispatch(setCount(notification - 1));
        });
        return () => {
            socket.off("createP2p");
            socket.off("operationP2p");
        };
    }, [socket, notification]);

    return (
        <LinearGradient
            style={{
                flex: 1,
            }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Safe flex={1}>
                <Box
                    row
                    alignCenter
                    paddingHorizontal={15}
                >
                    {notification > 0 ?
                        <Btn
                            radius={15}
                            onPress={() => navigate(screens.SETTING_STACK, {
                                screen: screens.HISTORY_TRANSACTION,
                            })}
                        >
                            <LottieView
                                source={require('@lottie/notification.json')}
                                autoPlay
                                loop
                                style={{
                                    width: 28,
                                    height: 28,
                                    marginRight: 5
                                }}
                            />
                        </Btn> :
                        <Icon
                            size={23}
                            marginRight={10}
                            tintColor={'white'}
                            source={require('@images/wallet/bell.png')}
                        />
                    }

                    <Box
                        row
                        flex={1}
                        radius={15}
                        alignCenter
                        borderWidth={0.5}
                        justifySpaceBetween
                        borderColor={colors.violet2}
                        backgroundColor={colors.violet}
                    >
                        {tabs.map((tab) =>
                            <Btn
                                key={tab}
                                radius={15}
                                paddingVertical={7}
                                paddingHorizontal={12}
                                onPress={() => setTabChoosed(tab)}
                                backgroundColor={tab === tabChoosed && colors.violet2}
                            >
                                <Txt color={'white'} size={12} bold>
                                    {t(tab)}
                                </Txt>
                            </Btn>
                        )}
                    </Box>
                    <Icon
                        size={23}
                        marginLeft={10}
                        tintColor={'white'}
                        source={require('@images/wallet/scanner.png')}
                    />
                </Box>

                {tabChoosed === 'WALLET' ?
                    <Wallet /> : tabChoosed === 'P2P' ?
                        <P2p /> : tabChoosed === 'STAKING' ?
                            <Staking /> : <Lending />
                }
            </Safe>
        </LinearGradient >
    )
}

export default TopTabWallet