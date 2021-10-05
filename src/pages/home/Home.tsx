import { userStorage } from 'userSession/userStorage';

export function Home() {
    return (
        <div>
            <h1>{userStorage.getFullName()}</h1>
            <button onClick={() => { userStorage.removeFromStorage(); window.location.href = "/login"}}>Salir</button>
        </div>
    );
}