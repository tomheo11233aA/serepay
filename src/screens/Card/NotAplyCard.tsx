import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Img from '@commom/Img';
import Txt from '@commom/Txt';
import {colors} from '@themes/colors';
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
      backgroundColor={colors.boxColor}>
      <Box width={'50%'}>
        <Txt size={15} fontFamily={fonts.OSB} color={colors.yellow}>
          {t('Consumer rebate card')}
        </Txt>

        <Box marginVertical={10}>
          <Txt color={'#fff'} size={13} fontFamily={fonts.OL}>
            Get up to <Txt color={'orange'}>15% </Txt> cashback in HW5 on your
            purchases
            <Txt color={'#006eff'}> Learn more {'>'} </Txt>
          </Txt>
        </Box>

        <Btn
          radius={4}
          padding={6}
          borderWidth={1}
          alignSelf={'flex-start'}
          borderColor={colors.yellow}>
          <Txt size={13} color={colors.yellow} fontFamily={fonts.OL}>
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
