import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const Fast = () => {
    return (
        <Box>
            <Box row marginTop={10} alignCenter>
                <Icon
                    size={30}
                    marginRight={10}
                    source={require('@images/wallet/shield.png')}
                />
                <Box>
                    <Txt>
                        Buy sell BTC fast and safe
                    </Txt>
                    <Txt marginTop={5}>
                        with a maximum of 30 minutes.
                        <Txt bold color={'red'}>{' Details'}</Txt>
                    </Txt>
                </Box>
            </Box>

            <Box row alignEnd marginTop={20}>
                <Icon
                    size={20}
                    marginRight={10}
                    tintColor={'black'}
                    source={require('@images/wallet/flag.png')}
                />
                <Txt>
                    You want to
                    <Txt color={colors.green}>{' buy '}</Txt>
                    Bitcoin?
                </Txt>
            </Box>
        </Box>
    )
}

export default Fast