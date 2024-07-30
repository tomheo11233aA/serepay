import FAQ from '../FAQ';
import Box from '@commom/Box';
import Header from './Header';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import Scroll from '@commom/Scroll';
import { colors } from '@themes/colors';

const Feedback = () => {
  return (
    <Box backgroundColor={colors.boxColor} flex paddingBottom={15}>
      <Header />
      <Scroll
        flex
        alignCenter
        justifyCenter
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <Txt fontFamily={fonts.OL} color={'#fff'}>
          If you encounter any issues, please let us know through the feedback.
        </Txt>
      </Scroll>
      <Scroll flex paddingHorizontal={15} showsVerticalScrollIndicator={false}>
        <FAQ />
      </Scroll>
    </Box>
  );
};
export default Feedback;
