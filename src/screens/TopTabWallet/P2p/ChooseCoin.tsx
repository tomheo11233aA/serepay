import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ChooseCoin = () => {
    const { t } = useTranslation()

    return (
        <Box paddingHorizontal={15} marginTop={20}>
            <Box
                row
                radius={5}
                alignCenter
                paddingLeft={10}
                justifySpaceBetween
                backgroundColor={colors.violet}
            >
                <Box row alignCenter>
                    <Icon
                        size={25}
                        marginRight={10}
                        source={require('@images/wallet/bitcoin.png')}
                    />
                    <Txt color={'white'} bold size={16}>
                        BITCOIN
                    </Txt>
                </Box>

                <Btn
                    radius={5}
                    padding={10}
                    backgroundColor={colors.darkViolet}
                >
                    <Txt color={'white'}>
                        {`${t('Choose another coin')} `}
                        <Icon
                            size={12}
                            tintColor={'white'}
                            source={require('@images/wallet/more.png')}
                        />
                    </Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default ChooseCoin