import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Img from '@commom/Img';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {useTranslation} from 'react-i18next';

const NotAplyCard = () => {
  const {t} = useTranslation();
  return (
    <Box
      row
      alignCenter
      marginTop={10}
      justifySpaceBetween
      paddingVertical={10}
      paddingHorizontal={15}
      backgroundColor={'#fff'}>
      <Box width={'50%'}>
        <Txt size={15} fontFamily={fonts.OSB}>
          {t('Consumer rebate card')}
        </Txt>

        <Box marginVertical={10}>
          <Txt size={13} fontFamily={fonts.OL}>
            Get up to <Txt color={'orange'}>15% </Txt> cashback in HW5 on your
            purchases
            <Txt color={'#006eff'}> Learn more {'>'} </Txt>
          </Txt>
        </Box>

        <Btn
          padding={6}
          radius={4}
          alignSelf={'flex-start'}
          backgroundColor={'#006eff'}>
          <Txt size={13} color={'#fff'} fontFamily={fonts.OL}>
            {t('Apply now')}
          </Txt>
        </Btn>
      </Box>

      <Img
        width={100}
        height={50}
        source={require('@images/Card/banner.png')}
      />
    </Box>
  );
};
export default NotAplyCard;
