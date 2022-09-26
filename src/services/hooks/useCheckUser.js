import apiMethods from "@/services/api/ApiMethods";

export async function useCheckUser() {
    return await apiMethods.checkUser();
}