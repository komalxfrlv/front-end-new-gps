import apiMethods from "@/services/api/ApiMethods";


export async function useGetAllTrackers() {
    let trackers;
    await apiMethods.getTrackers().then(t => {
        trackers = t
    });
    return trackers;
}
