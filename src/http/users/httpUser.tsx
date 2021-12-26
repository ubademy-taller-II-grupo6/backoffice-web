import { HttpAxiosUserBase } from "../httpAxiosUser";
import { User } from "types/user/userType";
import { ResponseBase } from "types/reponses/responsesType";

export const HttpUser = {
    getListUsers: () : Promise<ResponseBase<User[]>> => {
        return HttpAxiosUserBase.get(`users/`);
    },

    activateUser: (user: User) : Promise<ResponseBase<void>> => {
        user.blocked = false;
        return HttpAxiosUserBase.put(`users/${user.id}`, user);
    },

    blockUser: (user: User) : Promise<ResponseBase<void>> => {
        user.blocked = true;
        return HttpAxiosUserBase.put(`users/${user.id}`,user);
    }
}