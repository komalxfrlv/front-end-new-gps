import apiMethods from "@/services/api/ApiMethods";


export async function useGetAllWorkers() {
    let workers;
    await apiMethods.getWorkers().then(w => {
        workers = w
    });
    return workers;
}
