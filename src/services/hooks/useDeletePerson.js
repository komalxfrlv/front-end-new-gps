import apiMethods from "@/services/api/ApiMethods";

export async function useDeletePerson(id) {
    let person;
    await apiMethods.deletePersonById(id).then(c => {
        person = c
    });
    return person;
}