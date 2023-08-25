import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const Options = () => {
    const options = [
        {
            title: 'Send',
            icon: require('@images/wallet/upload.png'),
        },
        {
            title: 'Receive',
            icon: require('@images/wallet/download.png'),
        },
        {
            title: 'Swap',
            icon: require('@images/wallet/swap.png'),
        },
    ]

    return (
        <Box
            width={'100%'}
            paddingVertical={20}
            borderBottomWidth={10}
            borderColor={colors.gray3}
        >
            <Box
                row
                alignCenter
                width={'90%'}
                justifySpaceAround
                alignSelf={'center'}
            >
                {options.map((option) =>
                    <Btn key={option.title}>
                        <Icon
                            size={25}
                            source={option.icon}
                        />
                        <Txt marginTop={10}>
                            {option.title}
                        </Txt>
                    </Btn>
                )}
            </Box>
        </Box>
    )
}

export default Options