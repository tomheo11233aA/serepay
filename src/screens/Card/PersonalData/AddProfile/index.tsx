import Btn from '@commom/Btn';
import Img from '@commom/Img';
import Box from '@commom/Box';
import Header from './Header';
import Txt from '@commom/Txt';
import Input from '@commom/Input';
import {fonts} from '@themes/fonts';
import Scroll from '@commom/Scroll';
import {colors} from '@themes/colors';
import {useRef, useState} from 'react';
import {height, width} from '@utils/responsive';
import {TickCircle} from 'iconsax-react-native';
import {ArrowRight2} from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';
import VectorSignature from '@images/Card/signature.svg';
import Signature from 'react-native-signature-canvas';
import CountryPicker, {
  Country,
  CountryCode,
  TranslationLanguageCodeMap,
} from 'react-native-country-picker-modal';
import {Modal, Portal, Provider} from 'react-native-paper';
import BottomSheet, {BottomSheetRefProps} from '@commom/BottomSheet';

const Field = ({
  hint,
  label,
  value,
  setValue,
}: {
  hint: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <Box row alignCenter justifySpaceBetween>
      <Txt flex fontFamily={fonts.OL} color={'white'}>
        {label}
      </Txt>
      <Input
        flex
        hint={hint}
        fontSize={12}
        value={value}
        font={fonts.OL}
        textAlign={'right'}
        height={height * 0.06}
        onChangeText={setValue}
        hintColor={colors.gray2}
      />
    </Box>
  );
};

type Gender = 'Male' | 'Female';

type SelectFieldProps = {
  hint: string;
  label: string;
  onPress: () => void;
  value?: string | TranslationLanguageCodeMap;
};

const SelectField = ({label, value, onPress, hint}: SelectFieldProps) => {
  return (
    <Box row alignCenter justifySpaceBetween>
      <Txt flex fontFamily={fonts.OL} color={'white'}>
        {label}
      </Txt>
      <Btn
        flex
        onPress={onPress}
        height={height * 0.06}
        paddingHorizontal={10}
        style={{alignItems: 'flex-end'}}>
        <Box row alignCenter>
          <Txt
            size={13}
            fontFamily={fonts.OL}
            marginHorizontal={10}
            color={value ? 'white' : colors.gray2}>
            {value ? value : hint}
          </Txt>
          <ArrowRight2 size={13} color={value ? 'white' : colors.gray2} />
        </Box>
      </Btn>
    </Box>
  );
};

const AddProfile = () => {
  const ref = useRef<BottomSheetRefProps>(null);
  const handleOpenGender = () => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  };

  const [country, setCountry] = useState<Country | null>(null);
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [selectedGender, setSelectedGender] = useState<Gender>('Male');
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [idIssuanceCountry, setIdIssuanceCountry] = useState<Country | null>(
    null,
  );
  const [isIdIssuanceCountryPickerVisible, setIdIssuanceCountryPickerVisible] =
    useState(false);

  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());
  const [isDateOfBirthPickerVisible, setDateOfBirthPickerVisible] =
    useState(false);
  const [isExpirationDatePickerVisible, setExpirationDatePickerVisible] =
    useState(false);
  const [isSignatureVisible, setSignatureVisible] = useState(false);

  const handleSelectCountry = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setCountryPickerVisible(false);
  };

  const handleSelectIdIssuanceCountry = (selectedCountry: Country) => {
    setIdIssuanceCountry(selectedCountry);
    setIdIssuanceCountryPickerVisible(false);
  };

  return (
    <Box
      flex
      paddingBottom={15}
      alignCenter={false}
      backgroundColor={colors.boxColor}>
      <Header />
      <Scroll paddingBottom={50} paddingVertical={10} paddingHorizontal={15}>
        <Box marginTop={10}>
          <Txt fontFamily={fonts.OSB} marginBottom={15} color={colors.yellow}>
            Profile
          </Txt>
          <Field
            value=""
            setValue={() => {}}
            label="Real fist name"
            hint="Enter real first name"
          />

          <Field
            value=""
            setValue={() => {}}
            label="Real last name"
            hint="Enter real last name"
          />

          <SelectField
            label="Gender"
            value={selectedGender}
            hint="Select the gender"
            onPress={handleOpenGender}
          />

          <SelectField
            label="Residence"
            hint="Select the country"
            value={country?.name || ''}
            onPress={() => setCountryPickerVisible(true)}
          />

          <SelectField
            label="Date of birth"
            hint="Select date of birth"
            value={dateOfBirth.toLocaleDateString()}
            onPress={() => setDateOfBirthPickerVisible(true)}
          />

          <SelectField
            label="ID issuance country"
            hint="Select the ID issuance country"
            value={idIssuanceCountry?.name || ''}
            onPress={() => setIdIssuanceCountryPickerVisible(true)}
          />

          <SelectField
            value="Passport"
            label="Document type"
            onPress={() => {}}
            hint="Select the document type"
          />

          <Field
            value=""
            setValue={() => {}}
            label="Document number"
            hint="Enter document number"
          />

          <SelectField
            label="Expiration date"
            hint="Select the expiration date"
            value={expirationDate.toLocaleDateString()}
            onPress={() => setExpirationDatePickerVisible(true)}
          />
        </Box>

        <Scroll marginTop={10}>
          <Box row alignCenter justifySpaceBetween>
            <Txt fontFamily={fonts.OSB} color={colors.yellow}>
              Front ID photo
            </Txt>
            <Btn
              height={height * 0.06}
              paddingHorizontal={10}
              onPress={() => {}}>
              <Box row alignCenter>
                <Txt
                  size={13}
                  fontFamily={fonts.OL}
                  marginHorizontal={10}
                  color={colors.gray2}>
                  Upload
                </Txt>
                <ArrowRight2 size={13} color={colors.gray2} />
              </Box>
            </Btn>
          </Box>
          <Img
            resizeMode="cover"
            width={width * 0.9}
            height={height * 0.3}
            source={require('@images/Card/frontid.png')}
          />
        </Scroll>

        <Scroll marginTop={10}>
          <Box row alignCenter justifySpaceBetween>
            <Txt fontFamily={fonts.OSB} color={colors.yellow}>
              Hand holding ID photo
            </Txt>
            <Btn
              onPress={() => {}}
              height={height * 0.06}
              paddingHorizontal={10}>
              <Box row alignCenter>
                <Txt
                  size={13}
                  color={colors.gray2}
                  fontFamily={fonts.OL}
                  marginHorizontal={10}>
                  Upload
                </Txt>
                <ArrowRight2 size={13} color="#fff" />
              </Box>
            </Btn>
          </Box>
          <Img
            width={width * 0.9}
            resizeMode="cover"
            height={height * 0.3}
            source={require('@images/Card/frontid.png')}
          />
        </Scroll>

        <Box marginTop={10}>
          <Field
            value=""
            setValue={() => {}}
            label="Emergency contact"
            hint="Please enter the name"
          />
        </Box>

        <Box row alignCenter justifySpaceBetween marginTop={10}>
          <Txt fontFamily={fonts.OSB} color={colors.yellow}>
            Sign
          </Txt>

          <Btn
            radius={5}
            paddingVertical={3}
            paddingHorizontal={10}
            backgroundColor={colors.gray2}
            onPress={() => setSignatureVisible(true)}>
            <VectorSignature width={20} height={20} />
          </Btn>
        </Box>

        {isSignatureVisible && (
          <Box backgroundColor={'red'} height={500}>
            <Signature
              onOK={signature => {
                console.log(signature);
                setSignatureVisible(false);
              }}
              clearText="Clear"
              confirmText="Save"
              descriptionText="Sign"
              onEmpty={() => console.log('Empty')}
              webStyle={`.m-signature-pad--footer { display: block; margin: 0px; }`}
            />
          </Box>
        )}
      </Scroll>

      <BottomSheet ref={ref}>
        <Box alignCenter justifyCenter>
          <Txt fontFamily={fonts.OL} color={colors.gray2}>
            Gender
          </Txt>

          <Btn
            row
            alignCenter
            marginTop={10}
            width={'100%'}
            justifySpaceBetween
            paddingVertical={20}
            onPress={() => {
              setSelectedGender('Male');
            }}>
            <Box width={40} />
            <Txt fontFamily={fonts.OL} color={'white'}>
              Male
            </Txt>
            <TickCircle
              size={20}
              variant="Bold"
              style={{marginRight: 20}}
              color={selectedGender === 'Male' ? colors.green : 'transparent'}
            />
          </Btn>

          <Btn
            row
            alignCenter
            width={'100%'}
            paddingVertical={20}
            justifySpaceBetween
            onPress={() => {
              setSelectedGender('Female');
            }}>
            <Box width={40} />
            <Txt fontFamily={fonts.OL} color={'white'}>
              Female
            </Txt>
            <TickCircle
              size={20}
              variant="Bold"
              style={{marginRight: 20}}
              color={selectedGender === 'Female' ? colors.green : 'transparent'}
            />
          </Btn>
        </Box>
      </BottomSheet>

      <Btn
        radius={5}
        padding={10}
        width={'95%'}
        borderWidth={1}
        alignSelf={'center'}
        borderColor={colors.yellow}>
        <Txt fontFamily={fonts.OL} color={colors.yellow}>
          Save
        </Txt>
      </Btn>

      <CountryPicker
        withFilter
        withAlphaFilter
        withFlag={true}
        countryCode={countryCode}
        renderFlagButton={() => null}
        onSelect={handleSelectCountry}
        visible={isCountryPickerVisible}
        onClose={() => setCountryPickerVisible(false)}
      />

      <CountryPicker
        withFilter
        withFlag={true}
        withAlphaFilter
        countryCode={countryCode}
        renderFlagButton={() => null}
        onSelect={handleSelectIdIssuanceCountry}
        visible={isIdIssuanceCountryPickerVisible}
        onClose={() => setIdIssuanceCountryPickerVisible(false)}
      />

      <DatePicker
        modal
        mode="date"
        date={dateOfBirth}
        open={isDateOfBirthPickerVisible}
        onConfirm={date => {
          setDateOfBirthPickerVisible(false);
          setDateOfBirth(date);
        }}
        onCancel={() => {
          setDateOfBirthPickerVisible(false);
        }}
      />

      <DatePicker
        modal
        mode="date"
        date={expirationDate}
        open={isExpirationDatePickerVisible}
        onConfirm={date => {
          setExpirationDatePickerVisible(false);
          setExpirationDate(date);
        }}
        onCancel={() => {
          setExpirationDatePickerVisible(false);
        }}
      />
    </Box>
  );
};
export default AddProfile;
