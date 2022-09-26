import apiMethods from "@/services/api/ApiMethods";


export async function useGetWorkerById(id) {
    let car;
    await apiMethods.getWorkerById(id).then(c => {
        car = c
    });
    return car;
}