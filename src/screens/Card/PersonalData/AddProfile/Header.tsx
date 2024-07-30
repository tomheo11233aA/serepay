import Box from '@commom/Box';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {goBack} from '@utils/navigationRef';
import {useTranslation} from 'react-i18next';
import {ArrowLeft, ExportCircle} from 'iconsax-react-native';
import { colors } from '@themes/colors';

const Header = () => {
  const {t} = useTranslation();
  return (
    <Box
      row
      alignCenter
      paddingTop={10}
      justifySpaceBetween
      paddingHorizontal={20}>
      <ArrowLeft size={18} onPress={goBack} color="#fff" />
      <Txt fontFamily={fonts.OSB} size={16} color={colors.yellow}>
        {t('Add Profile')}
      </Txt>
      <Box width={18} />
    </Box>
  );
};
export default Header;
