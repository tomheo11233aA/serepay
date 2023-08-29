import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import React from 'react'
import Credit from './Credit'
import Statistical from './Statistical'

const Lending = () => {
    return (
        <Box flex={1} backgroundColor={'#edebf0'} marginTop={-20}>
            <Scroll flex={1}>
                <Credit />
                <Box
                    flex={1}
                    padding={20}
                    marginTop={20}
                    borderTopLeftRadius={20}
                    borderTopRightRadius={20}
                    backgroundColor={'white'}
                >
                    <Statistical />
                </Box>
            </Scroll>
        </Box>
    )
}

export default Lending