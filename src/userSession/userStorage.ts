interface UserDataSession {
    nombre: string,
    apellido: string,
    email: string
};

class UserStorage {
    keyStorage: string = "userSessionUbademy";

    public save(nombre: string, apellido: string, email: string) : void {
        
        let userSession: UserDataSession = 
        {
            nombre: nombre,
            apellido: apellido,
            email: email
        }

        localStorage.setItem(this.keyStorage, JSON.stringify(userSession));
    }

    public get(): UserDataSession {
        return JSON.parse(
            localStorage.getItem(this.keyStorage) as string
        ) as UserDataSession
    }
    
    public removeFromStorage() {
        localStorage.removeItem(this.keyStorage);
    }

    public isLogged() : boolean { return !!localStorage.getItem(this.keyStorage); }

    public getUserMail() { return this.get().email; }

    public getFullName() { 
        let userSession : UserDataSession = this.get();

        return `${userSession.nombre} ${userSession.apellido}`;
    }
}
 
export const userStorage = new UserStorage();