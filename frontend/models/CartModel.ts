import type { Product } from "./ProductModel";
import type { User } from "./UserModel";

export interface Cart {
    id: string;
    createdAt: Date,
    updatedAt: Date,
    orderId: number,
    product: Product,
    user: User,
}

