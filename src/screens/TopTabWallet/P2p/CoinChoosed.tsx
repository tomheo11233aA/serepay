import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ICoin } from '@models/coin'
import { keys } from '@contants/keys'
import CoinModal from '@commom/Modal/CoinModal'
import Spinner from 'react-native-loading-spinner-overlay'

interface Props {
    setSelectedCoin: (coin: ICoin) => void
    selectedCoin: any | null
}
const CoinChoosed: React.FC<Props> = ({ setSelectedCoin, selectedCoin}) => {
    const { t } = useTranslation()
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleChooseCoin = (coin: ICoin) => {
        setSelectedCoin(coin);
        hideModal();
    }

    return (
        <Box paddingHorizontal={15} marginTop={20}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <CoinModal visible={visible} hideModal={hideModal} handleChooseCoin={handleChooseCoin} t={t} />
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
                        source={selectedCoin ? { uri: `${keys.HOSTING_API}${selectedCoin.image}` } : require('@images/wallet/bitcoin.png')}
                    />
                    <Txt fontFamily={fonts.IBMPM}>
                        {selectedCoin ? selectedCoin.token_key : 'Bitcoin'}
                    </Txt>
                </Box>

                <Btn
                    radius={5}
                    padding={10}
                    backgroundColor={colors.violet3}
                    onPress={() => {
                        setIsLoading(true);
                        showModal();
                        setIsLoading(false);
                    }}                >
                    <Txt>
                        {`${t('Change coin')} `}
                    </Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default React.memo(CoinChoosed)