import * as yup from "yup";

export interface FormData {
    fullName: string;
    address: string;
    phone: string;
    company: string;
    passport: string;
    frontImage: string;
    backImage: string;
    selfieImage: string;
    // userId: number|null;
}

export const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone number is not valid").required("Phone is required"),
    company: yup.string().required("Company is required"),
    passport: yup.string().required("Passport is required"),
    frontImage: yup.string().required("Front image is required"),
    backImage: yup.string().required("Back image is required"),
    selfieImage: yup.string().required("Selfie image is required"),
    // userId: yup.number().nullable().required("User id is required"),
});