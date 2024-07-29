import Box from '@commom/Box';
import Img from '@commom/Img';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import {screens} from '@contants/screens';
import {useTranslation} from 'react-i18next';
import {navigate} from '@utils/navigationRef';
import {
  Gift,
  User,
  Coin1,
  Message,
  LinkSquare,
  QuoteUpCircle,
  ArrowRotateRight,
} from 'iconsax-react-native';
import Btn from '@commom/Btn';

const HeaderMenu = () => {
  const menu = [
    {
      title: 'Personal Data',
      bakcgroundColor: '#e1edff',
      callback: () => navigate(screens.PERSONAL_DATA),
      icon: <User size={12} variant="Bold" color="#006eff" />,
    },
    {
      title: 'Quick Link',
      bakcgroundColor: '#def4ed',
      callback: () => navigate(screens.QUICK_LINK),
      icon: <LinkSquare size={12} variant="Bold" color="#01a775" />,
    },
    {
      title: 'Commission rebate',
      bakcgroundColor: '#def4ed',
      callback: () => navigate(screens.COMMISTION_REBATE),
      icon: <Coin1 size={12} variant="Bold" color="#01a775" />,
    },
    {
      title: 'Feedback',
      bakcgroundColor: '#e1edff',
      callback: () => navigate(screens.FEEDBACK),
      icon: <Message size={12} variant="Bold" color="#006eff" />,
    },
    {
      title: 'Hyper rebate',
      bakcgroundColor: '#ffecdc',
      callback: () => navigate(screens.HYPER_REBATE),
      icon: <Gift size={12} variant="Bold" color="#ff7300" />,
    },
  ];
  const {t} = useTranslation();
  return (
    <Box
      paddingTop={10}
      paddingVertical={10}
      paddingHorizontal={15}
      backgroundColor={'#fff'}>
      <Box row justifySpaceBetween>
        <Txt size={20} fontFamily={fonts.OSB} color={'#000'}>
          {t('HyperCard')}
        </Txt>

        <Box row alignCenter>
          <QuoteUpCircle color={'#000'} size={20} />
          <Box width={20} />
          <ArrowRotateRight color={'#000'} size={20} />
        </Box>
      </Box>

      <Box row marginTop={30} alignCenter>
        <Txt
          size={15}
          paddingRight={10}
          fontFamily={fonts.OSB}
          style={{
            borderRightWidth: 1,
          }}>
          {t('Must-have')}
        </Txt>

        <Txt size={12} fontFamily={fonts.OL} paddingHorizontal={10}>
          {t('People are using')}
        </Txt>
      </Box>

      <Img
        radius={5}
        height={150}
        width={'100%'}
        marginTop={20}
        source={require('@images/Card/banner.png')}
      />

      <Box wrap row marginTop={20} justifySpaceBetween>
        {menu.map((item, index) => (
          <Btn
            key={index}
            alignCenter
            marginBottom={30}
            paddingHorizontal={10}
            onPress={item.callback}>
            <Box
              width={25}
              height={25}
              alignCenter
              key={index}
              radius={100}
              justifyCenter
              backgroundColor={item.bakcgroundColor}>
              {item.icon}
            </Box>
            <Txt size={10} marginTop={10} fontFamily={fonts.OL} center>
              {t(item.title)}
            </Txt>
          </Btn>
        ))}
      </Box>
    </Box>
  );
};
export default HeaderMenu;
