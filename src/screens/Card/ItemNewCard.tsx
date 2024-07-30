import Btn from '@commom/Btn';
import Img from '@commom/Img';
import Txt from '@commom/Txt';
import Box from '@commom/Box';
import Scroll from '@commom/Scroll';
import {fonts} from '@themes/fonts';
import {colors} from '@themes/colors';
import {screens} from '@contants/screens';
import {navigate} from '@utils/navigationRef';
import {Marquee} from '@animatereactnative/marquee';
import {useTranslation} from 'react-i18next';

type Props = {
  item: {
    img: any;
    id: number;
    desc: string;
    title: string;
    applied: string;
  };
  isDisable: boolean;
  mqTextLength: number;
  setIsDisable: (value: boolean) => void;
};

const ItemNewCard: React.FC<Props> = ({
  item,
  isDisable,
  mqTextLength,
  setIsDisable,
}) => {
  const {t} = useTranslation();
  return (
    <Btn
      row
      marginTop={20}
      justifySpaceBetween
      activeOpacity={0.8}
      disabled={isDisable}
      onPress={() => navigate(screens.NEW_CARD_DETAIL, {item: item})}>
      <Img radius={5} height={60} width={100} source={item.img} />
      <Box flex marginLeft={10}>
        <Box flex justifySpaceBetween>
          <Box>
            {item.title.length > mqTextLength ? (
              <Marquee spacing={20} speed={0.5}>
                <Txt size={14} fontFamily={fonts.OSB} color={'#fff'}>
                  {item.title}
                </Txt>
              </Marquee>
            ) : (
              <Txt size={14} fontFamily={fonts.OSB} color={'#fff'}>
                {item.title}
              </Txt>
            )}
            <Scroll
              horizontal
              marginTop={5}
              width={'100%'}
              showsHorizontalScrollIndicator={false}>
              <Txt
                size={10}
                color={colors.gray2}
                fontFamily={fonts.OL}
                onPress={() => setIsDisable(!isDisable)}>
                {t(item.desc)}
              </Txt>
            </Scroll>
          </Box>

          <Txt
            size={12}
            marginTop={5}
            color={colors.gray2}
            fontFamily={fonts.OL}>
            {t('1.07K applied')}
          </Txt>
        </Box>
      </Box>
    </Btn>
  );
};
export default ItemNewCard;
