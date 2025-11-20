import apiClient from "../api/apiClient";
import { Product } from "../models/ProductModel";

export async function getLimitedProducts(value: number) {

    const response = await apiClient.get(`/products/by-type?limit=${value}`);

    return response.data;
    
};

export async function getProducts() {

    const response = await apiClient.get("/products");

    return response.data.map((product: Product): Product => product);
    
};


export async function getProductById(id: string) {
    const response = await apiClient.get(`/products/${id}`);

    return response.data;
}

