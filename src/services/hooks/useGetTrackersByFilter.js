import apiMethods from "@/services/api/ApiMethods";


export async function useGetTrackersByFilter(filters) {
    let trackers;
    await apiMethods.getTrackersByFilters(filters).then(c => {
        trackers = c
    });
    return trackers;
}