import Box from '@commom/Box';
import Txt from '@commom/Txt';
import {useState} from 'react';
import {fonts} from '@themes/fonts';
import {colors} from '@themes/colors';
import ItemNewCard from './ItemNewCard';
import {screens} from '@contants/screens';
import {useTranslation} from 'react-i18next';
import {navigate} from '@utils/navigationRef';

const NewCard = () => {
  const {t} = useTranslation();
  const mqTextLength = 30;
  const mockData = [
    {
      id: 1,
      applied: '1.07K applied',
      img: require('@images/Card/card.png'),
      title: 'World Consumer Card (Apple Pay)',
      desc: 'Support Apple Pay | Simple KYC KYC',
    },
    {
      id: 2,
      applied: '1.07K applied',
      title: 'Glory Gold Card (USD)',
      img: require('@images/Card/card.png'),
      desc: 'Support Apple Pay | Simple KYC KYC',
    },
    {
      id: 3,
      applied: '1.07K applied',
      img: require('@images/Card/card.png'),
      title: 'demo01',
      desc: 'Support Apple Pay | Simple KYC KYC',
    },
    {
      id: 4,
      applied: '1.07K applied',
      img: require('@images/Card/card.png'),
      title: 'demo01',
      desc: 'Support Apple Pay | Simple KYC KYC',
    },
    {
      id: 5,
      applied: '1.07K applied',
      img: require('@images/Card/card.png'),
      title: 'demo01',
      desc: 'Support Apple Pay | Simple KYC KYC',
    },
  ];

  const [isDisable, setIsDisable] = useState(false);

  return (
    <Box
      marginTop={10}
      paddingVertical={10}
      paddingHorizontal={15}
      backgroundColor={colors.boxColor}>
      <Box row alignCenter justifySpaceBetween>
        <Txt size={16} fontFamily={fonts.OSB} color={colors.yellow}>
          {t('New card')}
        </Txt>
        <Txt
          size={14}
          fontFamily={fonts.OL}
          color={colors.gray2}
          onPress={() => {
            navigate(screens.NEW_CARD_MORE);
          }}>
          {t('More')}
        </Txt>
      </Box>

      <Box marginTop={20}>
        {mockData.map((item, index) => (
          <ItemNewCard
            key={index}
            item={item}
            isDisable={isDisable}
            mqTextLength={mqTextLength}
            setIsDisable={setIsDisable}
          />
        ))}
      </Box>
    </Box>
  );
};
export default NewCard;
