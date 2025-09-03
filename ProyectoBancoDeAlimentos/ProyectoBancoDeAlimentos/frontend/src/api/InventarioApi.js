import axiosInstance from './axiosInstance';

export function getAllProducts(){
    return axiosInstance.get('/api/Inventario/');
}
export function getAllSucursales(){
    return axiosInstance.get('/api/Inventario/sucursales');
}
