import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

interface Props {
    title: string;
    symbol: string;
    icon: ImageSourcePropType;
    iconConvert?: boolean;
    value?: string;
    setValue?: (value: string) => void;
    changeCoin?: () => void;    
    readonly?: boolean;
}

const ItemConver = ({
    icon,
    title,
    symbol,
    iconConvert = false,
    value,
    changeCoin,
    setValue,
    readonly = false,
}: Props) => {
    const { t } = useTranslation()
    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={colors.black2} size={15}>
                    {t(title)}
                </Txt>
                {iconConvert &&
                    <TouchableOpacity>
                        <Box
                            marginRight={50}
                            rotateZ={'90deg'}
                        >
                            <Icon
                                size={20}
                                tintColor={colors.violet}
                                source={require('@images/swap/convert.png')}
                            />
                        </Box>
                    </TouchableOpacity>
                }
            </Box>
            <Box
                row
                radius={5}
                marginTop={10}
                borderWidth={1}
                borderColor={'#eaeaea'}
            >
                <Input
                    flex={1}
                    hint={'0'}
                    fontSize={18}
                    fontWeight={'bold'}
                    paddingHorizontal={1}
                    borderTopLeftRadius={5}
                    backgroundColor={'white'}
                    borderBottomLeftRadius={5}
                    value={value}
                    onChangeText={setValue}
                    readonly={readonly}
                />
                <TouchableOpacity onPress={changeCoin}>
                    <Box
                        row
                        radius={5}
                        alignCenter
                        justifyCenter
                        paddingVertical={10}
                        paddingHorizontal={15}
                        backgroundColor={'#eaeaea'}
                    >
                        <Icon
                            size={25}
                            source={icon}
                        />
                        <Txt
                            bold
                            size={16}
                            color={colors.darkGreen}
                        >
                            {`  ${symbol}  `}
                        </Txt>
                        <Icon
                            size={15}
                            tintColor={'#a9abaa'}
                            source={require('@images/wallet/more.png')}
                        />
                    </Box>
                </TouchableOpacity>
            </Box>

        </Box>
    )
}

export default ItemConver