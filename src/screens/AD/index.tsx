import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Img from '@commom/Img'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { width } from '@utils/responsive'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTranslation } from 'react-i18next'

interface IAD {
  id?: number;
  title: string;
  image: ImageSourcePropType;
}

const AD = () => {
  const { t } = useTranslation()
  const ads: IAD[] = [
    { 
      id: 1,
      title: 'Welcome to swaptobe',
      image: require('@images/ads/banner.png'),
    },
    {
      id: 2,
      title: 'Swaptobe - Crypto Exchange',
      image: require('@images/ads/banner2.png'),
    },
    {
      id: 3,
      title: 'Swaptobe - Crypto Exchange',
      image: require('@images/ads/banner.png'),
    },
    {
      id: 4,
      title: 'Swaptobe - Crypto Exchange',
      image: require('@images/ads/banner2.png'),
    }
  ]

  return (
    <LinearGradient
      style={{ flex: 1 }}
      end={{ x: 1, y: 0.5 }}
      start={{ x: 0, y: 0.5 }}
      colors={[colors.darkViolet, colors.violet]}
    >
      <Box
        flex={1}
        marginTop={60}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Box
          row
          alignCenter
          paddingTop={10}
          paddingHorizontal={15}
        >
          <Icon
            size={25}
            source={require('@images/unAuth/left.png')}
          />
          <Txt bold color={colors.violet} size={18}>
            {t('TOBE ADS')}
          </Txt>
        </Box>
        <Scroll>
          {ads.map((ad, index) => {
            return (
              <ADItem
                ad={ad}
                index={index}
                key={ad.id}
              />
            )
          })}
        </Scroll>
      </Box>
    </LinearGradient>
  )
}

interface Props {
  ad: IAD;
  index: number;
}
const ADItem = ({ ad }: Props) => {
  return (
    <Box
      paddingVertical={20}
      paddingHorizontal={15}
      borderBottomWidth={10}
      borderColor={colors.gray}
    >
      <Box alignCenter>
        <Txt color={colors.darkGreen} bold>
          {ad.title}
        </Txt>
        <Img
          radius={15}
          width={'100%'}
          source={ad.image}
          resizeMode={'contain'}
          height={width * 50 / 100}
        />
      </Box>

      <Txt color={colors.black2}>
        Learn more
      </Txt>
    </Box>
  )
}

export default React.memo(AD)