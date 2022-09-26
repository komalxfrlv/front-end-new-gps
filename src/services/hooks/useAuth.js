import apiMethods from "@/services/api/ApiMethods";

export function useAuth(data) {
    return apiMethods.getTokenByLogin(data);
}