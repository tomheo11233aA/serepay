import All from './All';
import Mine from './Mine';
import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {colors} from '@themes/colors';
import {useState, useRef} from 'react';
import {PanResponder} from 'react-native';
import {goBack} from '@utils/navigationRef';
import {ArrowLeft} from 'iconsax-react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const NewCardMore = () => {
  const [tab, setTab] = useState('all');
  const navigation = useNavigation();
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          setTab('all');
        } else if (gestureState.dx < -50) {
          setTab('mine');
        }
      },
    }),
  ).current;

  return (
    <Box
      flex
      paddingBottom={15}
      backgroundColor={'#fff'}
      {...panResponder.panHandlers}>
      <Box
        row
        alignCenter
        paddingTop={10}
        justifySpaceBetween
        paddingHorizontal={20}>
        <ArrowLeft size={20} onPress={goBack} color="#000" />
        <Box
          row
          padding={1}
          alignCenter
          width={120}
          height={30}
          radius={100}
          justifySpaceBetween
          backgroundColor={colors.gray2}>
          <Btn
            flex
            height={28}
            radius={100}
            onPress={() => setTab('all')}
            backgroundColor={tab === 'all' ? '#fff' : 'transparent'}>
            <Txt
              size={14}
              fontFamily={fonts.OSB}
              color={tab === 'all' ? '#000' : colors.gray}>
              All
            </Txt>
          </Btn>

          <Btn
            flex
            height={28}
            radius={100}
            onPress={() => setTab('mine')}
            backgroundColor={tab === 'mine' ? '#fff' : 'transparent'}>
            <Txt
              size={14}
              fontFamily={fonts.OSB}
              color={tab === 'mine' ? '#000' : colors.gray}>
              Mine
            </Txt>
          </Btn>
        </Box>
        <Box width={20} />
      </Box>
      {tab === 'all' ? <All /> : <Mine />}
    </Box>
  );
};
export default NewCardMore;
