import Box from '@commom/Box';
import Scroll from '@commom/Scroll';
import Header from './Header';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import FAQ from '../FAQ';

const Feedback = () => {
  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Header />
      <Scroll
        flex
        alignCenter
        justifyCenter
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <Txt fontFamily={fonts.OL}>
          If you encounter anh issues, please let us know through the feedback.
        </Txt>
      </Scroll>
      <Scroll flex paddingHorizontal={15} showsVerticalScrollIndicator={false}>
        <FAQ />
      </Scroll>
    </Box>
  );
};
export default Feedback;
