import apiClient from "../api/apiClient";
import { User } from "../models/UserModel";

export async function getUsers() {

    const response = await apiClient.get("/users");

    return response.data.map((user: User): User => user);
}