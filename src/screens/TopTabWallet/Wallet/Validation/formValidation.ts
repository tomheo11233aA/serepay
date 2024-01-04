import * as yup from "yup";

export interface CreateBuyAdsProps {
    amount: string;
    amountMinimum: string;
}

export const buyAdvertisementSchema = yup.object().shape({
    amount: yup.number().required("Amount is required"),
    amountMinimum: yup.number().required("Minimum amount is required"),
});