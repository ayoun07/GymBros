import { Sex } from "./Sex";

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    sex: Sex;
    phone: number;
    address: string;
    resetToken: string;
    enabled: boolean;
    confirmationToken: string;
    createdAt: Date;
    updatedAt: Date;
}