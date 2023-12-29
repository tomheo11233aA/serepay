import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { ICoin } from '@models/coin';
import Coins from '@screens/TopTabWallet/Wallet/Coins';
import { useCoinSocket } from '../../../helper/useCoinSocket'
import { useSelector } from 'react-redux';
import { coinListSelector } from '@redux/selector/userSelector'
import Box from '@commom/Box';
import Scroll from '@commom/Scroll';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import Icon from '@commom/Icon';
import { fonts } from '@themes/fonts';
import { keys } from '@contants/keys';
import { colors } from '@themes/colors';

interface Props {
  visible: boolean;
  hideModal: () => void;
  handleChooseCoin: (coin: ICoin) => void;
  t: any;
}

const CoinModal: React.FC<Props> = ({ visible, hideModal, handleChooseCoin, t }) => {
  useCoinSocket()
  const coins = useSelector(coinListSelector)
  
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 5,
        }}>
        <Box>
          <Scroll showsVerticalScrollIndicator={false}>
            {coins.map((coin) => {
              return (
                <Btn
                  row
                  alignCenter
                  padding={20}
                  key={coin.id}
                  justifySpaceBetween
                  onPress={() => {
                    handleChooseCoin(coin)
                  }}
                >
                  <Box row alignCenter>
                    <Icon
                      size={35}
                      marginRight={10}
                      source={{ uri: `${keys.HOSTING_API}${coin.image}` }}
                    />
                    <Box>
                      <Txt bold size={16} color={colors.darkGreen}>
                        {coin.name}
                      </Txt>
                      <Txt marginTop={9} size={14} color={colors.darkGreen}>
                        {`$${coin.price}  `}
                        <Txt color={coin.percent >= 0 ? '#75c1a8' : '#c94d4d'}>
                          {coin.percent >= 0 ? `+${coin.percent}%` : `${coin.percent}%`}
                        </Txt>
                      </Txt>

                    </Box>
                  </Box>
                  <Txt bold color={colors.darkGreen}>
                    {`${coin.volume} ${coin.symbolWallet}`}
                  </Txt>
                </Btn>
              )
            })}
          </Scroll>
        </Box>
      </Modal>
    </Portal>
  );
};

export default React.memo(CoinModal);

