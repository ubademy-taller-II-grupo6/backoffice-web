export interface UserSession {
    nombre: string,
    apellido: string,
    email: string
}

export interface Administrator {
    id: number,
    name: string,
    surname: string,
    email: string,
    isblocked: boolean
}