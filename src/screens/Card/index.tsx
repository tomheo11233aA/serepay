import FAQ from './FAQ';
import NewCard from './NewCard';
import Scroll from '@commom/Scroll';
import HeaderMenu from './HeaderMenu';
import NotAplyCard from './NotAplyCard';
import {BOTTOM_TAB_HEIGHT} from '@utils/responsive';

const Card = () => {
  return (
    <Scroll
      paddingBottom={BOTTOM_TAB_HEIGHT}
      showsVerticalScrollIndicator={false}>
      <HeaderMenu />
      <NotAplyCard />
      <NewCard />
      <FAQ />
    </Scroll>
  );
};
export default Card;
