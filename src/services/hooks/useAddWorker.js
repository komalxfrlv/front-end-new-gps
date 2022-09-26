import apiMethods from "@/services/api/ApiMethods";
import {isEmptyStr} from "@/services/checks/isEmptyStr";

export async function useAddWorker(data) {
    if (
        !isEmptyStr(data.name) ||
        !isEmptyStr(data.surname) ||
        !isEmptyStr(data.patronymic) ||
        !isEmptyStr(data.phone) ||
        !isEmptyStr(data.address)
    ) {
        let message;
        await apiMethods.addWorker(data).then(m => {
            message = m
        });
        return message
    }
    else
        return {error: 'Ошибка заполнения формы'}
}
