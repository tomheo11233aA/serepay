import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const Note = ({ t }: any) => {
    return (
        <Box
            row
            alignEnd
            paddingTop={15}
            paddingBottom={30}
            paddingHorizontal={15}
            borderBottomWidth={10}
            borderColor={colors.gray3}
        >
            <Box height={'100%'}>
                <Icon
                    size={20}
                    marginRight={10}
                    source={require('@images/wallet/attention.png')}
                />
            </Box>

            <Box>
                <Txt italic color={colors.darkGreen}>
                    {t('Promotion January 15 to January 31, 2022:')}
                </Txt>
                <Txt italic color={colors.darkGreen}>
                    {t('DOUBLE DEPOSIT + DOUBLE ICO')}
                    <Txt bold color={colors.darkViolet}>
                        {` ${t('More details')}`}
                    </Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default Note