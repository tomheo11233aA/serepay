import * as yup from "yup";

export interface WelletData {
    address: string;
    note: string;
    amount: string;
}

export const aliasesSchema = yup.object().shape({
    amount: yup.string().required("Amount is required"),
    userName: yup.string().required("User name is required"),
    message: yup.string().required("Message is required"),
});