import Box from '@commom/Box';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {goBack} from '@utils/navigationRef';
import {useTranslation} from 'react-i18next';
import {ArrowLeft, ExportCircle} from 'iconsax-react-native';

const Header = () => {
  const {t} = useTranslation();
  return (
    <Box
      row
      alignCenter
      paddingTop={10}
      justifySpaceBetween
      paddingHorizontal={20}>
      <ArrowLeft size={18} onPress={goBack} color="#000" />
      <Txt fontFamily={fonts.OSB} size={16}>
        {t('Hyper Card Rebate')}
      </Txt>
      <Txt fontFamily={fonts.OL} size={16} color="#000">
        {t('Details')}
      </Txt>
    </Box>
  );
};
export default Header;
