import apiClient from "../api/apiClient";


export async function addToCart(userId: string, productId: string) {
    const response = await apiClient.post(`/cart/${userId}/${productId}`);

    return response.data;
}

export async function getCart(userId: string) {
    const response = await apiClient.get(`/cart/${userId}`);

    return response.data;
}