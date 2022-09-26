import apiMethods from "@/services/api/ApiMethods";
import {isEmptyStr} from "@/services/checks/isEmptyStr";

export async function useAddCar(data) {
    if (
        !isEmptyStr(data.mark) ||
        !isEmptyStr(data.model) ||
        !isEmptyStr(data.number) ||
        !isEmptyStr(data.color)  ||
        !isEmptyStr(data.vin)
    ) {
        let message;
        await apiMethods.addCar(data).then(m => {
            message = m
        });
        return message
    }
    else
        return {error: 'Ошибка заполнения формы'}
}
