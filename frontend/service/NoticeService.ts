
import apiClient from "../api/apiClient";
import type { NoticeCreate } from "../models/NoticeModel";

export async function getNotices() {
    const response = await apiClient.get("/notices");

    return response.data;
}

export async function getNoticesId(id: string) {
    const response = await apiClient.get(`/notices/product/${id}`);

    return response.data;
}

export async function postNotices(newNotices: Partial<NoticeCreate>) {
    const response = await apiClient.post(`/notices`, newNotices);

    return response.data;
}

export async function getAverageRating(id: string) {
    const response = await apiClient.get(`notices/product/${id}/average`);

    return response.data;
}