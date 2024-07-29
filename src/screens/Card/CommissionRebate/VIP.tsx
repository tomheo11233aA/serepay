import Box from '@commom/Box';
import Txt from '@commom/Txt';
import Scroll from '@commom/Scroll';

const VIP = () => {
  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Scroll showsVerticalScrollIndicator={false} flex>
        <Txt>vip</Txt>
      </Scroll>
    </Box>
  );
};
export default VIP;
