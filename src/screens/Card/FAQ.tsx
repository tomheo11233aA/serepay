import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import {useState} from 'react';
import {fonts} from '@themes/fonts';
import {faqData} from './card.mock';
import {colors} from '@themes/colors';
import {useTranslation} from 'react-i18next';
import {ArrowUp2, ArrowDown2} from 'iconsax-react-native';
import Accordion from 'react-native-collapsible/Accordion';

const FAQ = () => {
  const {t} = useTranslation();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const renderHeader = (section: any, _: any, isActive: any) => (
    <Box row alignCenter marginTop={30} justifySpaceBetween>
      <Txt size={14} fontFamily={fonts.OSB}>
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
      <Txt size={12} fontFamily={fonts.OL}>
        {t(section.content)}
      </Txt>
    </Box>
  );
  return (
    <Box
      marginTop={10}
      paddingVertical={10}
      paddingHorizontal={15}
      backgroundColor={'#fff'}>
      <Box row alignCenter justifySpaceBetween>
        <Txt size={16} fontFamily={fonts.OSB}>
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
  );
};
export default FAQ;
