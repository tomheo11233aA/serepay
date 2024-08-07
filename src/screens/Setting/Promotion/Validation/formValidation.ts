import * as yup from "yup";

export interface WelletData {
    address: string;
    note: string;
    amount: string;
}

export const walletSchema = yup.object().shape({
    address: yup.string().required("Address is required"),
    note: yup.string().required("Note is required"),
    amount: yup.string().required("Amount is required"),
});