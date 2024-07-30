import Box from '@commom/Box';
import Header from './Header';
import Txt from '@commom/Txt';
import {fonts} from '@themes/fonts';
import Input from '@commom/Input';
import Scroll from '@commom/Scroll';
import {colors} from '@themes/colors';
import Btn from '@commom/Btn';

const QuickLink = () => {
  return (
    <Box backgroundColor={colors.boxColor} flex paddingBottom={15}>
      <Header />
      <Scroll
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <Box marginTop={20}>
          <Txt fontFamily={fonts.OSB} color={colors.yellow}>
            What is the quick card linking service?
          </Txt>

          <Txt fontFamily={fonts.OL} marginTop={10} color={'#fff'}>
            Quick card linking service is launched for HyperCard physical or
            virtual card users to link the account number with card number.
            After the card number linking is submitted, the KYC is required to
            be completed. Once succeeded, HyperCard deposit and related consumer
            services can be used normally, but unlinking after that is not
            allowed.
          </Txt>
        </Box>

        <Box marginTop={20}>
          <Txt fontFamily={fonts.OSB} color={colors.yellow}>
            Link card number
          </Txt>
          <Input
            fontSize={14}
            marginTop={10}
            color={'#fff'}
            font={fonts.OSB}
            borderBottomWidth={1}
            hintColor={colors.gray2}
            borderColor={colors.gray}
            hint={'Please enter the card number'}
          />
        </Box>

        <Box marginTop={20}>
          <Txt fontFamily={fonts.OSB} color={colors.yellow}>
            Envelope number
          </Txt>
          <Input
            fontSize={14}
            color={'#fff'}
            marginTop={10}
            font={fonts.OSB}
            borderBottomWidth={1}
            hintColor={colors.gray2}
            borderColor={colors.gray}
            hint={'Please enter the envelope number'}
          />
        </Box>

        <Box marginTop={30} row alignCenter justifySpaceBetween>
          <Txt fontFamily={fonts.OSB} color={colors.yellow}>
            Linking card name
          </Txt>
          <Txt fontFamily={fonts.OSB} color={'#fff'}>
            --
          </Txt>
        </Box>

        <Box marginTop={40} row alignCenter justifySpaceBetween>
          <Txt fontFamily={fonts.OSB} color={colors.yellow}>
            Instruction
          </Txt>
          <Txt fontFamily={fonts.OSB} color={'#006eff'}>
            Turtorial
          </Txt>
        </Box>

        <Box marginTop={15}>
          <Txt fontFamily={fonts.OL} color={colors.gray2} size={14}>
            ● Quick card linking instructions:{' '}
          </Txt>
          <Txt
            fontFamily={fonts.OL}
            color={colors.gray2}
            size={14}
            marginTop={10}>
            {'\t'} 1. No fee is charged for the quick card linking service, and
            it cannot be changed after the linking is successful. {'\n'}
            {'\t'} 2. The mailer number is unique and relevant. After receiving
            the mail, check all the relevant information, and do not disclose
            the card number and mailer number to anyone.
          </Txt>
        </Box>
      </Scroll>
      <Btn
        radius={5}
        padding={10}
        width={'95%'}
        borderWidth={1}
        alignSelf={'center'}
        borderColor={colors.yellow}>
        <Txt fontFamily={fonts.OL} color={colors.yellow}>
          Submit
        </Txt>
      </Btn>
    </Box>
  );
};
export default QuickLink;
