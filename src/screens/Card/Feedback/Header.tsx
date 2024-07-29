import Box from '@commom/Box';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {goBack} from '@utils/navigationRef';
import {useTranslation} from 'react-i18next';
import {ArrowLeft, Edit2, Headphone} from 'iconsax-react-native';

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
        {t('Feedback')}
      </Txt>
      <Box row alignCenter>
        <Headphone size={20} color="#000" />
        <Box width={10} />
        <Edit2 size={20} color="#000" />
      </Box>
    </Box>
  );
};
export default Header;
