import { HttpAxiosBase } from "../httpAxios";
import { UserSession } from "types/user/userType";

export const HttpUser = {
    loginUser: (email: string, password: string): Promise<UserSession> => {
        return HttpAxiosBase.getWithQueryParams(
            "login",
            {
                email: email,
                contraseña: password
            }
        );
    }
}
