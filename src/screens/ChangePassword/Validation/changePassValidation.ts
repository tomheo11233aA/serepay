import * as yup from "yup";

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup.string()
        .required("New password is required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Your password must be at least 8 characters long and contain at least one number and one letter.')
        .max(20, 'Password must be less than 20 characters'),
    confirmPassword: yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
});