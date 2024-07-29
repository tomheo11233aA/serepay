import Box from '@commom/Box';
import Header from './Header';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {colors} from '@themes/colors';
import Btn from '@commom/Btn';
import {navigate} from '@utils/navigationRef';
import {screens} from '@contants/screens';

const PersonalData = () => {
  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Header />
      <Box flex alignCenter justifyCenter>
        <Txt fontFamily={fonts.OL}>You have not gilled in any profile</Txt>
        <Txt size={12} color={colors.gray2} fontFamily={fonts.OL}>
          You can click the button below to add profile
        </Txt>
      </Box>
      <Btn
        radius={5}
        padding={10}
        width={'95%'}
        alignSelf={'center'}
        backgroundColor={'#006eff'}
        onPress={() => navigate(screens.ADD_PROFILE)}>
        <Txt fontFamily={fonts.OL} color={'white'}>
          Add Profile
        </Txt>
      </Btn>
    </Box>
  );
};
export default PersonalData;
