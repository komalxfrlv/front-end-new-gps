import apiMethods from "@/services/api/ApiMethods";

export async function useDeleteTracker(id) {
    let tracker;
    await apiMethods.deleteTrackerById(id).then(c => {
        tracker = c
    });
    return tracker;
}