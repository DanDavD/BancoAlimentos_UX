import axiosInstance from './axiosInstance';


export function GetALLCupones(id_usuario) {
<<<<<<< Updated upstream
    return axiosInstance.get(`/api/cupones/${id_usuario}`)
                        .then(res => res.data);
=======
    return axiosInstance.get(`/api/cupones/${id_usuario}`);
}
export function GetCupones() {
    return axiosInstance.get('/api/cupones');
>>>>>>> Stashed changes
}    