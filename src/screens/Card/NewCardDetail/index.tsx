import Img from '@commom/Img';
import Header from './Header';
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import {useState} from 'react';
import Scroll from '@commom/Scroll';
import {fonts} from '@themes/fonts';
import {faqData} from '../card.mock';
import {colors} from '@themes/colors';
import {Dimensions} from 'react-native';
import {goBack} from '@utils/navigationRef';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {BOTTOM_TAB_HEIGHT} from '@utils/responsive';
import Accordion from 'react-native-collapsible/Accordion';
import {ArrowUp2, ArrowDown2, ArrowRight2} from 'iconsax-react-native';
import Btn from '@commom/Btn';

const InfoCard = ({
  title,
  value,
  isBold,
}: {
  title: string;
  value: string;
  isBold?: boolean;
}) => {
  const {t} = useTranslation();
  return (
    <Box row marginTop={15} justifySpaceBetween>
      <Txt size={12} fontFamily={fonts.OL} flex color={'#fff'}>
        {t(title)}
      </Txt>
      <Txt
        flex
        right
        size={12}
        numberOfLines={2}
        color={colors.gray2}
        fontFamily={isBold ? fonts.OSB : fonts.OL}>
        {t(value)}
      </Txt>
    </Box>
  );
};

const {width} = Dimensions.get('window');

const NewCardDetail = () => {
  const route = useRoute();
  const {t} = useTranslation();
  const {item} = route.params as any;
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const renderHeader = (section: any, _: any, isActive: any) => (
    <Box row alignCenter marginTop={30} justifySpaceBetween>
      <Txt size={14} fontFamily={fonts.OSB} color={'white'}>
        {t(section.title)}
      </Txt>
      {isActive ? (
        <ArrowUp2 size={20} color={colors.gray2} />
      ) : (
        <ArrowDown2 size={20} color={colors.gray2} />
      )}
    </Box>
  );
  const renderContent = (section: any) => (
    <Box marginTop={10}>
      <Txt size={12} fontFamily={fonts.OL} color={'white'}>
        {t(section.content)}
      </Txt>
    </Box>
  );
  if (item === undefined) {
    goBack();
    return null;
  }

  return (
    <Box backgroundColor={colors.boxColor} flex paddingBottom={15}>
      <Header />
      <Scroll
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <Box marginTop={15} relative>
          <Img radius={8} width={'100%'} height={220} source={item.img} />
          <Box absolute top={0} left={0} right={0} bottom={0}>
            <Txt
              size={16}
              color={'#fff'}
              numberOfLines={2}
              maxWidth={width * 0.7}
              fontFamily={fonts.OSB}
              paddingHorizontal={15}
              style={{top: '35%', left: '25%'}}>
              {item.title}
            </Txt>

            <Txt
              size={20}
              color={'#fff'}
              style={{top: '40%'}}
              fontFamily={fonts.OSB}
              paddingHorizontal={15}>
              6688 8888 8888 8888
            </Txt>
          </Box>
        </Box>

        <Box
          row
          radius={16}
          alignCenter
          padding={16}
          marginTop={15}
          justifySpaceBetween
          backgroundColor={colors.gray3}>
          <Box flex>
            <Txt size={16} fontFamily={fonts.OSB}>
              Cosumer rebate Card
            </Txt>
            <Txt
              size={12}
              marginTop={5}
              color={colors.gray2}
              fontFamily={fonts.OL}>
              Up to{' '}
              <Txt size={12} color={'orange'}>
                15%
              </Txt>{' '}
              rebate on transaction
            </Txt>
          </Box>
          <ArrowRight2 size={16} color="#006eff" />
        </Box>

        <Box marginTop={15}>
          <InfoCard title="Card currency" value="USD" isBold />
          <InfoCard title="Card type" value="Virtual card" />
          <InfoCard title="Common card issuing fee" value="50.0 USDT" isBold />
          <InfoCard
            isBold
            value="300.0 USDT"
            title="Upgrade to Cashback Card"
          />
          <InfoCard title="Consumption method" value="Debit Card" />
          <InfoCard title="Deposit fee rate" value="2%" />
          <InfoCard title="Spending limit" value="20000.0 USD/dau" />
          <InfoCard title="Review time" value="Within 24 hours" />
          <InfoCard title="1.07k applied" value="" />
        </Box>

        <Box marginTop={30}>
          <Txt size={16} fontFamily={fonts.OSB} color={colors.yellow}>
            {t('Application')}
          </Txt>
          <Txt size={12} marginTop={5} fontFamily={fonts.OL} color={'white'}>
            {t('1. Applicants must be over 18 years old')}
          </Txt>
          <Txt size={12} marginTop={5} fontFamily={fonts.OL} color={'white'}>
            {t(
              '2. Each passport can only apply for one card of each type at most',
            )}
          </Txt>

          <Txt
            size={16}
            fontFamily={fonts.OSB}
            marginTop={30}
            color={colors.yellow}>
            {t('Charges')}
          </Txt>

          <Box>
            <InfoCard title="Card Type" value="Virtual card" isBold />
            <InfoCard title="Payment method" value="Debit Card" isBold />
            <InfoCard title="Card Issuance Fee" value="$50" isBold />
            <InfoCard title="Initial Deposit Amount" value="$100" isBold />
            <InfoCard title="Deposit Fee Rate" value="2%" isBold />
            <InfoCard title="Min Single Deposit Amount" value="$20" isBold />
            <InfoCard title="Monthy Card Fee" value="$1" isBold />
            <InfoCard title="Transaction Fee" value="$0.25" isBold />
            <InfoCard
              isBold
              value="$0.25"
              title="Transaction Authorization Fee"
            />
            <InfoCard
              isBold
              value="$0.25"
              title="Failed transaction Service Fee"
            />
            <InfoCard
              title="Low-Value Transaction Fee"
              value="Currently waived"
              isBold
            />
            <InfoCard title="Review Time" value="Within 24 hours" isBold />
            <InfoCard
              isBold
              title="Supported Platform"
              value="Apple Pay/Pinduoduo/Alipay/WeChat/Amazon/Shopee, etc."
            />

            <Txt
              size={16}
              fontFamily={fonts.OSB}
              marginTop={30}
              color={colors.yellow}>
              {t('Restricted countries of application')}
            </Txt>
            <InfoCard
              title="Restricted countries of birth"
              value="Iraq/Korea Democratic People's Republic/China/Sudan"
            />

            <Txt
              size={16}
              fontFamily={fonts.OSB}
              marginTop={30}
              color={colors.yellow}>
              {t('Supported platforms')}
            </Txt>
            <Txt size={12} marginTop={10} fontFamily={fonts.OL} color={'white'}>
              {t(
                'Support cross-border payments and advertising expenditure, including Apple Pay, PayPal, Ads, TikTok ads, etc.',
              )}
            </Txt>
          </Box>
        </Box>

        <Box marginTop={30}>
          <Box row alignCenter justifySpaceBetween>
            <Txt size={16} fontFamily={fonts.OSB} color={colors.yellow}>
              {t('FAQ')}
            </Txt>
            <Txt size={14} fontFamily={fonts.OL} color={colors.gray2}>
              {t('More')}
            </Txt>
          </Box>
          <Accordion
            sections={faqData}
            expandMultiple={true}
            renderHeader={renderHeader}
            underlayColor="transparent"
            onChange={setActiveSections}
            renderContent={renderContent}
            activeSections={activeSections}
          />
        </Box>
      </Scroll>
      <Btn
        marginHorizontal={10}
        padding={15}
        borderColor={colors.yellow}
        borderWidth={1}>
        <Txt size={13} color={colors.yellow} fontFamily={fonts.OL}>
          {t('Apply now')}
        </Txt>
      </Btn>
    </Box>
  );
};
export default NewCardDetail;
