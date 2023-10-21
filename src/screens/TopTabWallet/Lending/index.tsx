import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import React from 'react'
import Credit from './Credit'
import Statistical from './Statistical'
import { useTranslation } from 'react-i18next'

const Lending = () => {
    const { t } = useTranslation()

    return (
        <Box
            flex={1}
            marginTop={10}
        >
            <Scroll flex={1}>
                <Credit t={t} />
                <Box
                    flex={1}
                    padding={20}
                    marginTop={20}
                    borderTopLeftRadius={20}
                    borderTopRightRadius={20}
                    backgroundColor={'white'}
                >
                    <Statistical t={t} />
                </Box>
            </Scroll>
        </Box>
    )
}

export default Lending