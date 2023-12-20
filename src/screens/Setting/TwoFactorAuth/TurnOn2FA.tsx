import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import AxiosInstance from '../../../helper/AxiosInstance'
import Safe from '@reuse/Safe'
import Box from '@commom/Box'
import { generateOTPToken, turnOn2FA } from '@utils/userCallApi'

const TurnOn2FA = () => {
    const [otp, setOtp] = useState('')
    const [otpAuthUrl, setOtpAuthUrl] = useState('')
    useEffect(() => {
        const fetchOtpAuth = async () => {
            try {
                const response = await generateOTPToken()
                setOtp(response?.data.otp)
                setOtpAuthUrl(response?.data.otpAuth)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchOtpAuth()
    }
        , [])

    const handleTurnOn2FA = async () => {
        const axiosInstance = AxiosInstance()
        try {
            const response = await turnOn2FA({ otp })
            console.log(response?.data)
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <Safe>
            <Box>
                {otpAuthUrl && <QRCode value={otpAuthUrl} />}
            </Box>
            <TextInput
                placeholder="OTP"
                onChangeText={(text) => setOtp(text)}
                value={otp}
            />
            <TouchableOpacity
                onPress={handleTurnOn2FA}
            >
                <Text>Turn on 2FA</Text>
            </TouchableOpacity>

        </Safe>
    )
}

export default TurnOn2FA

const styles = StyleSheet.create({})