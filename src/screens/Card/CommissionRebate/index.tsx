import Box from '@commom/Box';
import Scroll from '@commom/Scroll';
import CommissionRebateTab from './Tab';
import Txt from '@commom/Txt';

const CommissionRebate = () => {
  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Scroll
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <CommissionRebateTab />
      </Scroll>
    </Box>
  );
};
export default CommissionRebate;
