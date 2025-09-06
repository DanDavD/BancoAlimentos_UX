import axiosInstance from './axiosInstance';


export function GetALLCupones(id_usuario) {
    return axiosInstance.get(`/api/cupones/${id_usuario}`);
}
    