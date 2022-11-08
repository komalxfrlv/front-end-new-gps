import apiMethods from "@/services/api/ApiMethods";

export async function useGetNowOfflineTrackers() {
    let trackers;
    await apiMethods.getNowOfflineTrackers().then(t => {
        trackers = t
    });
    return trackers;
}