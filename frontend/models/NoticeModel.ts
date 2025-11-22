import type { User } from "./UserModel"
export interface Notice {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    title: string;
    product: number;
    user: User;
}

export interface NoticeCreate {
    title: string;
    productId: number;
    userId: number;
}
