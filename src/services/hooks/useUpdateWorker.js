import apiMethods from "@/services/api/ApiMethods";


export async function useUpdateWorker(data) {
    let car;
    await apiMethods.updateWorker(data).then(c => {
        car = c
    });
    return car;
}