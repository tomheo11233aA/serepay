import * as yup from "yup";

export interface CreateBuyAdsProps {
    amount: string;
    amountMinimum: string;
}

export const sellAdvertisementSchema = yup.object().shape({
    amount: yup.number().required("Amount is required"),
    amountMinimum: yup.number().required("Minimum amount is required"),
    // fullName: yup.string().required("Full name is required"),
    // accountNumber: yup.string().required("Account number is required"),
    // bankName: yup.string().required("Bank name is required"),
    bankName: yup.string().required("Bank name is required"),
    ownerAccount: yup.string().required("Owner account is required"),
    numberBank: yup.string().required("Number bank is required"),
});