import apiMethods from "@/services/api/ApiMethods";


export async function useGetCarById(id) {
    let car;
    await apiMethods.getCarById(id).then(c => {
        car = c
    });
    return car;
}