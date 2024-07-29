import Box from '@commom/Box';
import Txt from '@commom/Txt';
import Scroll from '@commom/Scroll';

const Agent = () => {
  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Scroll showsVerticalScrollIndicator={false}>
        <Txt>Agent</Txt>
      </Scroll>
    </Box>
  );
};
export default Agent;
