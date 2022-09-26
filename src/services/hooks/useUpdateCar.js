import apiMethods from "@/services/api/ApiMethods";


export async function useUpdateCar(data) {
    let car;
    await apiMethods.updateCar(data).then(c => {
        car = c
    });
    return car;
}