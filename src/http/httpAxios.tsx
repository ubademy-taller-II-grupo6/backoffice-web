import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

let axiosInstance: AxiosInstance;
let timeuotMs : number = 20000;
let urlServer : string = "https://calm-shore-44525.herokuapp.com/";

axiosInstance = axios.create({
    baseURL: urlServer,
    timeout: timeuotMs
});

const responseBody = (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) 
        return {
            data: response.data,
            tieneError: false,
            mensajeError: "" 
        }  
    
    return {
        data: null,
        tieneError: true,
        mensajeError: response.data.detail.error
    }  
} 

const responseBodyError = (responseError: AxiosError) => {
    let msgError : string = "Por favor, verifique los datos ingresados";

    if (responseError.response?.data) msgError = responseError.response.data.detail.error;

    return {
        data: null,
        tieneError: true,
        mensajeError: msgError
    }  
} 

export const HttpAxiosBase = {
	get: (url: string) => axiosInstance.get(url).then(responseBody).catch(responseBodyError),
	getWithQueryParams: (url: string, params : {}) => axiosInstance.get(url, { params: params}).then(responseBody).catch(responseBodyError),
	post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody).catch(responseBodyError),
	put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody).catch(responseBodyError),
	delete: (url: string) => axiosInstance.delete(url).then(responseBody).catch(responseBodyError),
};
