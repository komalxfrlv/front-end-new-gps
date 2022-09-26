import apiMethods from "@/services/api/ApiMethods";


export async function useGetTrackerById(id) {
    let tracker;
    await apiMethods.getTrackerById(id).then(t => {
        tracker = t
    });
    return tracker;
}