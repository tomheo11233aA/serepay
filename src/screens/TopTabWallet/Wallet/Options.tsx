import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { TFunction } from 'i18next'
import React from 'react'
import { Modal, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { exchangeRateSelector } from '@redux/selector/userSelector'

interface Props {
    t: TFunction<"translation", undefined>
    setSelectedRate: (rate: any) => void
}

const Options = ({ t, setSelectedRate }: Props) => {
    const [visible, setVisible] = React.useState(false);
    const exchangeRate = useSelector(exchangeRateSelector)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleRateSelect = (rate: any) => {
        setSelectedRate({ title: rate.title, rate: rate.rate })
        hideModal()
    }

    const options = [
        {
            title: 'Send',
            icon: require('@images/wallet/upload.png'),
            // onPress: () => console.log('send'),
        },
        {
            title: 'Receive',
            icon: require('@images/wallet/download.png'),
            // onPress: () => console.log('receive'),
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
                        {exchangeRate.map((item) => (
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
                width={'90%'}
                justifySpaceAround
                alignSelf={'center'}
            >
                {options.map((option) =>
                    <Btn key={option.title} onPress={option.onPress}>
                        <Icon
                            size={25}
                            source={option.icon}
                        />
                        <Txt marginTop={10} fontFamily={fonts.IBMPM}>
                            {t(option.title)}
                        </Txt>
                    </Btn>
                )}
            </Box>
        </Box>
    )
}

export default Options