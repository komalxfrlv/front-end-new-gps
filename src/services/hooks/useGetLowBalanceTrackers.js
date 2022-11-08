import apiMethods from "@/services/api/ApiMethods";

export async function useGetLowBalanceTrackers() {
    let trackers;
    await apiMethods.getLowBalanceTrackers().then(t => {
        trackers = t
    });
    return trackers;
}