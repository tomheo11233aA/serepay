import FAQ from './FAQ';
import NewCard from './NewCard';
import Scroll from '@commom/Scroll';
import HeaderMenu from './HeaderMenu';
import NotAplyCard from './NotAplyCard';
import {BOTTOM_TAB_HEIGHT} from '@utils/responsive';
import {colors} from '@themes/colors';

const Card = () => {
  return (
    <Scroll
      paddingBottom={BOTTOM_TAB_HEIGHT}
      showsVerticalScrollIndicator={false}
      backgroundColor={colors.backgroundColor}>
      <HeaderMenu />
      <NotAplyCard />
      <NewCard />
      <FAQ />
    </Scroll>
  );
};
export default Card;
