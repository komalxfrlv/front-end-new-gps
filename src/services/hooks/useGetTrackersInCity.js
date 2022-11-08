import apiMethods from "@/services/api/ApiMethods";


export async function useGetTrackersInCity(city) {
    let trackers;
    await apiMethods.getTrackersInCity(city).then(t => {
        trackers = t
    });
    return trackers;
}