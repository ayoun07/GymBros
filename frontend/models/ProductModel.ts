import { Type } from "./Type";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    type: Type;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
}