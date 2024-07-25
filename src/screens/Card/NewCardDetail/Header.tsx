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
      paddingTop={20}
      justifySpaceBetween
      paddingHorizontal={20}>
      <ArrowLeft size={20} onPress={goBack} color="#000" />
      <Txt fontFamily={fonts.OSB} size={20}>
        {t('HyperCard')}
      </Txt>
      <ExportCircle size={20} color="#000" />
    </Box>
  );
};
export default Header;
