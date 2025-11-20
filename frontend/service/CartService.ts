import apiClient from "../api/apiClient";


export async function addToCart(userId: string, productId: string) {
    const response = await apiClient.post(`/cart/${userId}/${productId}`);

    return response.data;
}