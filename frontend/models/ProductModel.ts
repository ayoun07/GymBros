import { Type } from "./Type";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    favorite: boolean;
    type: Type;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
}