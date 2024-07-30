import Box from '@commom/Box';
import Header from './Header';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {colors} from '@themes/colors';
import Btn from '@commom/Btn';
import {navigate} from '@utils/navigationRef';
import {screens} from '@contants/screens';
import {useTranslation} from 'react-i18next';

const PersonalData = () => {
  const {t} = useTranslation();
  return (
    <Box backgroundColor={colors.boxColor} flex paddingBottom={15}>
      <Header />
      <Box flex alignCenter justifyCenter>
        <Txt fontFamily={fonts.OL} color={'#fff'}>
          {t('You have not gilled in any profile')}
        </Txt>
        <Txt size={12} color={colors.gray2} fontFamily={fonts.OL}>
          {t('You can click the button below to add profile')}
        </Txt>
      </Box>
      <Btn
        radius={5}
        padding={10}
        width={'95%'}
        borderWidth={1}
        alignSelf={'center'}
        borderColor={colors.yellow}
        onPress={() => navigate(screens.ADD_PROFILE)}>
        <Txt fontFamily={fonts.OL} color={colors.yellow}>
          Add Profile
        </Txt>
      </Btn>
    </Box>
  );
};
export default PersonalData;
