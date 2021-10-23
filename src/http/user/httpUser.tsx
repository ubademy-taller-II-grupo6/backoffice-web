import { HttpAxiosBase } from "../httpAxios";
import { Administrator, UserSession } from "types/user/userType";
import { ResponseBase } from "types/reponses/responsesType";

export const HttpUser = {
    loginUser: (email: string, password: string): Promise<ResponseBase<UserSession>> => {
        return HttpAxiosBase.getWithQueryParams(
            "login/",
            {
                email: email,
                contraseña: password
            }
        );
    },

    getAdminByEmail: (email: string) : Promise<ResponseBase<Administrator>> => {
        return HttpAxiosBase.getWithQueryParams(
            "user/",
            {
                email: email
            }
        );
    }
}
