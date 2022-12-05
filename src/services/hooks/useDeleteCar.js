import apiMethods from "@/services/api/ApiMethods";

export async function useDeleteCar(id) {
    let car;
    await apiMethods.deleteCarById(id).then(c => {
        car = c
    });
    return car;
}