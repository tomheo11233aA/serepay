import Box from '@commom/Box'
import React from 'react'
import ItemConver from './ItemConver'
import Warn from './Warn'

interface Props {
    t: any;
}

const MakePrice = ({ t }: Props) => {
    return (
        <Box>
            <ItemConver
                symbol={'BTC'}
                title={'Amount of BTC'}
                icon={require('@images/wallet/bitcoin.png')}
            />
            <ItemConver
                symbol={'ETH'}
                iconConvert={true}
                title={'Amount of ETH'}
                icon={require('@images/wallet/eth.png')}
            />
            <Warn
                title={t('The final ETH amount you receive may be slightly different due to market volatility')}
            />
            <Warn
                title={t('Swap Fee 0.25% implementation and has been deducted from the estimate above')}
            />
        </Box>
    )
}

export default MakePrice