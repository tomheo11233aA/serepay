import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const ChooseCoin = () => {
    return (
        <Box
            row
            radius={5}
            alignCenter
            padding={15}
            marginTop={40}
            justifySpaceBetween
            backgroundColor={colors.darkViolet}
        >
            <Box row alignCenter>
                <Icon
                    size={35}
                    marginRight={10}
                    source={require('@images/wallet/bitcoin.png')}
                />
                <Txt color={'white'} bold size={16}>
                    BTC
                </Txt>
            </Box>

            <Btn backgroundColor={colors.violet} padding={10} radius={5}>
                <Txt color={'white'}>
                    Choose another coin
                </Txt>
            </Btn>
        </Box>
    )
}

export default ChooseCoin