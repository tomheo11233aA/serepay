import * as yup from "yup";

export interface CreateBuyAdsProps {
    amount: string;
    amountMinimum: string;
}

export const sellAdvertisementSchema = yup.object().shape({
    amount: yup.number().required("Amount is required"),
    amountMinimum: yup.number().required("Minimum amount is required")
        .test(
            'is-less-than-amount',
            'Minimum amount must be less than amount',
            function (value) {
                return value < this.parent.amount;
            }
        ),
    bankName: yup.string().required("Bank name is required"),
    ownerAccount: yup.string().required("Owner account is required"),
    numberBank: yup.string().required("Number bank is required"),
    contact: yup.string().required("Contact is required"),
});