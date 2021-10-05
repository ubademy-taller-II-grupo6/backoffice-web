import axios, { AxiosInstance, AxiosResponse } from 'axios';

let axiosInstance: AxiosInstance;
let timeuotMs : number = 20000;
let urlServer : string = "http://calm-shore-44525.herokuapp.com/";

axiosInstance = axios.create({
    baseURL: urlServer,
    timeout: timeuotMs
});

const responseBody = (response: AxiosResponse) => response.data;

export const HttpAxiosBase = {
	get: (url: string) => axiosInstance.get(url).then(responseBody),
	getWithQueryParams: (url: string, params : {}) => axiosInstance.get(url, { params: params}).then(responseBody),
	post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
	delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};
