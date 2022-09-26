import apiMethods from "@/services/api/ApiMethods";


export async function useUpdateTracker(data) {
    let tracker;
    await apiMethods.updateTracker(data).then(t => {
        tracker = t
    });
    return tracker;
}