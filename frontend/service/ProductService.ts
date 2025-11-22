import apiClient from "../api/apiClient";
import type { Product } from "../models/ProductModel";

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
};

export async function findProductByName(value: string) {
    const response = await apiClient.get(`/products/search?name=${value}`);

    return response.data;
};

export const findSimilarProducts = async (productId: string) => {
    const response = await apiClient.get(`/products/${productId}/similar`);

    return response.data;
};

export async function updateFavoriteProduct(productId: string, newProduct: Partial<Product>) {
    const response = await apiClient.put(`/products/${productId}`, newProduct);

    return response.data;
};

