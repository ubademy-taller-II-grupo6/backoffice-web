import { HttpAxiosUserBase } from "../httpAxiosUser";
import { User } from "types/user/userType";
import { ResponseBase } from "types/reponses/responsesType";

export const HttpUser = {
    getListUsers: () : Promise<ResponseBase<User[]>> => {
        return HttpAxiosUserBase.get(`users/`);
    },

    activateUser: (userId: number) : Promise<ResponseBase<void>> => {
        return HttpAxiosUserBase.put(
            `users/${userId}`,
            {
                "blocked": false
            }
        );
    },

    blockUser: (userId: number) : Promise<ResponseBase<void>> => {
        return HttpAxiosUserBase.put(
            `users/${userId}`,
            {
                "blocked": true
            }
        );
    }
}