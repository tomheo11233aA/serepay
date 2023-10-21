import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CoinChoosed from '../P2p/CoinChoosed'
import Amount from './Amount'
import SelectPackage from './SelectPackage'
import Statistical from './Statistical'

const Staking = () => {
    const { t } = useTranslation()

    return (
        <Box
            flex={1}
            marginTop={10}
        >
            <Scroll flex={1}>
                <CoinChoosed />
                <SelectPackage t={t} />
                <Box
                    flex={1}
                    padding={20}
                    marginTop={20}
                    borderTopLeftRadius={20}
                    borderTopRightRadius={20}
                    backgroundColor={'white'}
                >
                    <Amount t={t} />
                    <Statistical t={t} />
                </Box>
            </Scroll>
        </Box>
    )
}

export default Staking