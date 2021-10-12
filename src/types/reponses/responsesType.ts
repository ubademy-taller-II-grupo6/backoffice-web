export interface ResponseBase<T> {
    data: T | null; 
    tieneError: boolean;
    mensajeError: string;
}