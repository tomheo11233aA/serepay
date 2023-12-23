import React, { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import Safe from '@reuse/Safe'
import Box from '@commom/Box'
import { generateOTPToken, turnOn2FA } from '@utils/userCallApi'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import Btn from '@commom/Btn'
import { navigate } from '@utils/navigationRef'

const TurnOn2FA = () => {
    const [otp, setOtp] = useState('')
    const [otpAuthUrl, setOtpAuthUrl] = useState('')
    useEffect(() => {
        const fetchOtpAuth = async () => {
            try {
                const response = await generateOTPToken()
                setOtp(response?.data.secret)
                setOtpAuthUrl(response?.data.otpAuth)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchOtpAuth()
    }, [])

    const handleTurnOn2FA = async () => {
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
            <Txt color={colors.darkGreen} bold size={18} >
                Scan this QR code in the authenticator app, or enter the code below manually into the app
            </Txt>
            <Box alignCenter marginVertical={30}>
                {otpAuthUrl && <QRCode size={200} value={otpAuthUrl} />}
            </Box>

            <Txt color={colors.darkGreen} bold size={18} center>
                {otp}
            </Txt>
            <Btn backgroundColor={colors.darkViolet}>
                <Txt bold size={18} color={'white'}>
                    Next
                </Txt>
            </Btn>
        </Safe>
    )
}

export default TurnOn2FA

