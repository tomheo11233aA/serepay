import Box from '@commom/Box'
import React from 'react'
import ChooseCoin from '../P2p/ChooseCoin'
import SelectPackage from './SelectPackage'
import Amount from './Amount'
import Statistical from './Statistical'
import Scroll from '@commom/Scroll'
import { useTranslation } from 'react-i18next'

const Staking = () => {
    const { t } = useTranslation()

    return (
        <Box
            flex={1}
            marginTop={10}
            backgroundColor={'#edebf0'}
        >
            <Scroll flex={1}>
                <ChooseCoin />
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