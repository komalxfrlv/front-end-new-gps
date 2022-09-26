import apiMethods from "@/services/api/ApiMethods";


export async function useGetAllCars() {
    let cars;
    await apiMethods.getCars().then(w => {
        cars = w
    });
    return cars;
}