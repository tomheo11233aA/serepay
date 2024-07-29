import {useRef} from 'react';
import Btn from '@commom/Btn';
import Box from '@commom/Box';
import Header from './Header';
import Txt from '@commom/Txt';
import Input from '@commom/Input';
import {fonts} from '@themes/fonts';
import Scroll from '@commom/Scroll';
import {colors} from '@themes/colors';
import {height} from '@utils/responsive';
import {Modalize} from 'react-native-modalize';
import {ArrowRight2} from 'iconsax-react-native';

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
      <Txt flex fontFamily={fonts.OL}>
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

type SelectFieldProps = {
  hint: string;
  label: string;
  value?: string;
  onPress: () => void;
};

const SelectField = ({label, value, onPress, hint}: SelectFieldProps) => {
  return (
    <Box row alignCenter justifySpaceBetween>
      <Txt flex fontFamily={fonts.OL}>
        {label}
      </Txt>
      <Btn
        flex
        height={height * 0.06}
        paddingHorizontal={10}
        onPress={onPress}
        style={{alignItems: 'flex-end'}}>
        <Box row alignCenter>
          <Txt
            size={13}
            fontFamily={fonts.OL}
            marginHorizontal={10}
            color={value ? '#000' : colors.gray2}>
            {value ? value : hint}
          </Txt>
          <ArrowRight2 size={13} color={value ? '#000' : colors.gray2} />
        </Box>
      </Btn>
    </Box>
  );
};

const AddProfile = () => {
  const modalizeGenderRef = useRef<Modalize>(null);

  const openGenderModal = () => {
    modalizeGenderRef.current?.open;
  };

  return (
    <Box backgroundColor={'#fff'} flex paddingBottom={15}>
      <Header />
      <Scroll
        paddingBottom={50}
        paddingVertical={10}
        paddingHorizontal={15}
        showsVerticalScrollIndicator={false}>
        <Box marginTop={10}>
          <Txt fontFamily={fonts.OSB} marginBottom={15}>
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
            value="Male"
            label="Gender"
            hint="Select the gender"
            onPress={openGenderModal}
          />

          <SelectField
            value=""
            label="Residence"
            hint="Select the country"
            onPress={openGenderModal}
          />

          <SelectField
            value=""
            label="Date of birth"
            onPress={openGenderModal}
            hint="Select date of birth"
          />

          <SelectField
            value=""
            onPress={openGenderModal}
            label="ID issuance country"
            hint="Select the ID issuance country"
          />

          <SelectField
            value="Passport"
            label="Document type"
            onPress={openGenderModal}
            hint="Select the document type"
          />

          <Field
            value=""
            setValue={() => {}}
            label="Document number"
            hint="Enter document number"
          />

          <SelectField
            value=""
            onPress={openGenderModal}
            label="Expiration date"
            hint="Select the expiration date"
          />
        </Box>

        <Box marginTop={10}>
          <Box row alignCenter justifySpaceBetween>
            <Txt fontFamily={fonts.OSB}>Front ID photo</Txt>
            <Btn
              height={height * 0.06}
              paddingHorizontal={10}
              onPress={() => {}}>
              <Box row alignCenter>
                <Txt size={13} fontFamily={fonts.OL} marginHorizontal={10}>
                  Upload
                </Txt>
                <ArrowRight2 size={13} color="#000" />
              </Box>
            </Btn>
          </Box>
        </Box>

        <Box marginTop={10}>
          <Box row alignCenter justifySpaceBetween>
            <Txt fontFamily={fonts.OSB}>Hand holding ID photo</Txt>
            <Btn
              height={height * 0.06}
              paddingHorizontal={10}
              onPress={() => {}}>
              <Box row alignCenter>
                <Txt size={13} fontFamily={fonts.OL} marginHorizontal={10}>
                  Upload
                </Txt>
                <ArrowRight2 size={13} color="#000" />
              </Box>
            </Btn>
          </Box>
        </Box>

        <Box marginTop={10}>
          <Field
            value=""
            setValue={() => {}}
            label="Emergency contact"
            hint="Please enter the name"
          />
        </Box>

        {/* TODO: Chữ ký */}
      </Scroll>
      <Btn
        radius={5}
        padding={10}
        width={'95%'}
        alignSelf={'center'}
        backgroundColor={'#006eff'}>
        <Txt fontFamily={fonts.OL} color={'white'}>
          Save
        </Txt>
      </Btn>
    </Box>
  );
};
export default AddProfile;
