import apiMethods from "@/services/api/ApiMethods";

export function useLogout() {
    return apiMethods.logout();
}