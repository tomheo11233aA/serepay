import * as yup from "yup";

export interface CardNumberData {
    cardNumber: string;
    cardHolderName: string;
    cardExpiryDate: string;
    bankName: string;
}

export const cardSchema = yup.object().shape({
    cardNumber: yup.string().required("Card number is required"),
    cardHolderName: yup.string().required("Card holder name is required"),
    cardExpiryDate: yup.string(),
    bankName: yup.string().required("Please Choose Your Bank"),
});