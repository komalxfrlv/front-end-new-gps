import apiMethods from "@/services/api/ApiMethods";
import {isEmptyStr} from "@/services/checks/isEmptyStr";

export async function useAddTracker(data) {
    if (
        !isEmptyStr(data.imei) ||
        !isEmptyStr(data.phone) ||
        !isEmptyStr(data.tracked) ||
        !(isEmptyStr(data.car_id) &&  isEmptyStr(data.person_id))
    ) {
        let message;
        await apiMethods.addTracker(data).then(m => {
            message = m
        });
        return message
    }
    else
        return {error: 'Ошибка заполнения формы'}
}
