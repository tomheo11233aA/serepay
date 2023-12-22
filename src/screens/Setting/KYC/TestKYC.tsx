import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { TextInput, Button, View, Text } from 'react-native'

let schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone number is not valid").required("Phone is required"),
    company: yup.string().required("Company is required"),
    passport: yup.string().required("Passport is required"),
})

const TestKYC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data: any) => console.log(data)
    return (
        <SafeAreaView>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Full Name"
                    />
                )}
                name="fullName"
                defaultValue=""
            />
            {errors.fullName && <Text>{errors.fullName.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Address"
                    />
                )}
                name="address"
                defaultValue=""
            />
            {errors.address && <Text>{errors.address.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Phone"
                    />
                )}
                name="phone"
                defaultValue=""
            />
            {errors.phone && <Text>{errors.phone.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Company"
                    />
                )}
                name="company"
                defaultValue=""
            />
            {errors.company && <Text>{errors.company.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Passport"
                    />
                )}
                name="passport"
                defaultValue=""
            />
            {errors.passport && <Text>{errors.passport.message}</Text>}
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
    )
}

export default TestKYC

const styles = StyleSheet.create({})