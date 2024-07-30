import Box from '@commom/Box';
import Header from './Header';
import Scroll from '@commom/Scroll';
import Txt from '@commom/Txt';
import {useTranslation} from 'react-i18next';
import {fonts} from '@themes/fonts';

const HyperRebate = () => {
  const {t} = useTranslation();
  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Header />
      <Scroll
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <Box row alignCenter justifySpaceBetween marginTop={15}>
          <Box>
            <Txt fontFamily={fonts.OSB} size={16}>
              {t('Hyper Card Rebate')}
            </Txt>
            <Txt fontFamily={fonts.OSB} size={16} marginTop={10}>
              {t('Up to')}{' '}
              <Txt color={'orange'} size={16} fontFamily={fonts.OSB}>
                {' '}
                70%
              </Txt>
            </Txt>

            <Txt fontFamily={fonts.OL} size={12} marginLeft={10} marginTop={8}>
              {'● ' + t('Higher Rebate to HBT Lock-up')} {'\n'}
              {'● ' + t('Rabates Every Day')}
            </Txt>
          </Box>
        </Box>
      </Scroll>
    </Box>
  );
};
export default HyperRebate;
