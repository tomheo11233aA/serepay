import * as yup from "yup";

export interface CreateBuyAdsProps {
    amount: string;
    amountMinimum: string;
    contact: string;
}

export const buyAdvertisementSchema = yup.object().shape({
    amount: yup.number().required("Amount is required").typeError("Amount must be a number"),
    amountMinimum: yup.number().required("Minimum amount is required")
        .test(
            'is-less-than-amount',
            'Minimum amount must be less than amount',
            function (value) {
                return value <= this.parent.amount;
            }
        ).typeError("Minimum amount must be a number"),
    contact: yup.string().required("Contact is required"),
});