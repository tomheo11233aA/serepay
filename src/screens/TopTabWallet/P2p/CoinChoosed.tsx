import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CoinChoosed = () => {
    const { t } = useTranslation()

    return (
        <Box paddingHorizontal={15} marginTop={20}>
            <Box
                row
                radius={5}
                alignCenter
                paddingLeft={10}
                justifySpaceBetween
                backgroundColor={'white'}
            >
                <Box row alignCenter>
                    <Icon
                        size={25}
                        marginRight={10}
                        source={require('@images/wallet/bitcoin.png')}
                    />
                    <Txt fontFamily={fonts.IBMPM}>
                        Bitcoin
                    </Txt>
                </Box>

                <Btn
                    radius={5}
                    padding={10}
                    backgroundColor={colors.violet3}
                >
                    <Txt>
                        {`${t('Change coin')} `}
                    </Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default CoinChoosed