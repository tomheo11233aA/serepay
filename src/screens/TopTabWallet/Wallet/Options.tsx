import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { TFunction } from 'i18next'
import React, { useMemo } from 'react'
import { Modal, Portal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { exchangeRateSelector } from '@redux/selector/userSelector'
import { AppDispatch } from '@redux/store/store'
import { setSelectedRate } from '@redux/slice/userSlice'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'

interface Props {
    t: TFunction<"translation", undefined>
}

const Options = ({ t }: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const [visible, setVisible] = React.useState(false);
    const exchangeRate = useSelector(exchangeRateSelector)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const sortedexExchangeRate = useMemo(()=>{
        return [...exchangeRate].sort((a,b)=>a.title.localeCompare(b.title))
    }, [exchangeRate])

    const handleRateSelect = (rate: any) => {
        dispatch(setSelectedRate({ title: rate.title, rate: rate.rate }))
        hideModal()
    }

    const options = [
        {
            title: 'Create Your Buy Ads',
            icon: require('@images/wallet/upload.png'),
            onPress: () => navigate(screens.CREATE_BUY_ADS),

        },
        {
            title: 'Create Your Sell Ads',
            icon: require('@images/wallet/download.png'),
            onPress: () => navigate(screens.CREATE_SELL_ADS),
        },
        {
            title: 'Swap',
            icon: require('@images/wallet/swap.png'),
            onPress: showModal,
        },
    ]

    return (
        <Box
            width={'100%'}
            paddingVertical={20}
            borderBottomWidth={10}
            borderColor={colors.gray3}
        >
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle=
                    {{
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        marginVertical: 10,
                        borderRadius: 7,
                    }}>
                    <Box
                        width={'100%'}
                        paddingVertical={20}
                        borderColor={colors.gray3}
                    >
                        {sortedexExchangeRate.map((item) => (
                            <Btn
                                key={item.id}
                                row
                                width={'90%'}
                                justifySpaceAround
                                alignSelf={'center'}
                                borderWidth={0.3}
                                marginTop={7}
                                borderColor={colors.gray2}
                                borderTopLeftRadius={4}
                                borderTopRightRadius={4}
                                borderBottomLeftRadius={4}
                                borderBottomRightRadius={4}
                                onPress={() => handleRateSelect(item)}
                            >
                                <Txt paddingVertical={5} fontFamily={fonts.IBMPM} center>
                                    {item.title}
                                </Txt>
                                <Txt fontFamily={fonts.IBMPM} center>
                                    {item.rate}
                                </Txt>
                            </Btn>
                        ))}
                    </Box>
                </Modal>
            </Portal>
            <Box
                row
                alignCenter
                width={'95%'}
                justifySpaceAround
                alignSelf={'center'}
            >
                {options.map((option) =>
                    <Btn key={option.title} onPress={option.onPress}>
                        <Icon
                            tintColor={colors.violet}
                            size={25}
                            source={option.icon}
                        />
                        <Txt marginTop={10} fontFamily={fonts.IBMPM}
                            width={wp(21)}
                            center
                        >
                            {t(option.title)}
                        </Txt>
                    </Btn>
                )}
            </Box>
        </Box>
    )
}

export default Options