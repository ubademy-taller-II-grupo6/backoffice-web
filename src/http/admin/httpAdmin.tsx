import { HttpAxiosBase } from "../httpAxios";
import { Administrator } from "types/user/userType";
import { ResponseBase } from "types/reponses/responsesType";

export const HttpAdmin = {
    getAdminByEmail: (email: string) : Promise<ResponseBase<Administrator>> => {
        return HttpAxiosBase.get(`admins/email/${email}`);
    },

    getListAdmins: () : Promise<ResponseBase<Administrator[]>> => {
        return HttpAxiosBase.get(`admins`);
    } 
}
