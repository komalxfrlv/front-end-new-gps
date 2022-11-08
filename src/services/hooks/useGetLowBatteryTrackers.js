import apiMethods from "@/services/api/ApiMethods";

export async function useGetLowBatteryTrackers() {
    let trackers;
    await apiMethods.getLowBatteryTrackers().then(t => {
        trackers = t
    });
    return trackers;
}