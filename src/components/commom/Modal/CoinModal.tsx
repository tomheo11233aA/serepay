import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { ICoin } from '@models/coin';
import Coins from '@screens/TopTabWallet/Wallet/Coins';
import { useCoinSocket } from '../../../helper/useCoinSocket'

interface Props {
  visible: boolean;
  hideModal: () => void;
  handleChooseCoin: (coin: ICoin) => void;
  t: any;
}

const CoinModal: React.FC<Props> = ({ visible, hideModal, handleChooseCoin, t }) => {
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
        <Coins t={t} isShowHeader onCoinSelected={handleChooseCoin} />
      </Modal>
    </Portal>
  );
};

export default React.memo(CoinModal);

