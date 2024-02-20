import * as yup from "yup";

export interface CreateBuyAdsProps {
    email: string;
    userName: string;
    password: string;
    rePassword: string;
    acceptWithEula: boolean;
}

export const registerSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    rePassword: yup.string().nullable().required("Re-Password is required").oneOf([yup.ref('password')], 'Passwords must match'),
    acceptWithEula: yup.boolean().oneOf([true], "You must accept with EULA")
});