interface UserDataSession {
    name: string,
    surname: string,
    email: string
};

class UserStorage {
    keyAdminStorage: string = "adminSessionUbademy";
    keyTokenStorage: string = "tokenSessionUbademy";

    public logInUser(name: string, surname: string, email: string, token: string) : void {
        
        let userSession: UserDataSession = 
        {
            name: name,
            surname: surname,
            email: email
        }

        localStorage.setItem(this.keyAdminStorage, JSON.stringify(userSession));
        localStorage.setItem(this.keyTokenStorage, token);
    }

    public get(): UserDataSession {
        return JSON.parse(
            localStorage.getItem(this.keyAdminStorage) as string
        ) as UserDataSession
    }
    
    public logOutUser() {
        localStorage.removeItem(this.keyAdminStorage);
        localStorage.removeItem(this.keyTokenStorage);
    }

    public isLogged() : boolean { return !!localStorage.getItem(this.keyAdminStorage); }

    public getUserMail() { return this.get().email; }

    public getFullName() { 
        let userSession : UserDataSession = this.get();

        return `${userSession.name} ${userSession.surname}`;
    }
}
 
export const userStorage = new UserStorage();