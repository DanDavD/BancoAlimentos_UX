import axiosInstance from './axiosInstance';

export function getTopProductosUsuario(id_usuario){
    return axiosInstance.post('/api/reportes-usuario/top-productos', {id_usuario});
}
export function getProductosRecomendados(id_usuario){
    return axiosInstance.post('/api/reportes-usuario/productos-recomendados', {id_usuario});
}
export function getDiasCompra(id_usuario){
    return axiosInstance.post('/api/reportes-usuario/dias-compra', {id_usuario});
}
export function getTotalAhorrado(id_usuario){
    return axiosInstance.post('/api/reportes-usuario/total-ahorrado', {id_usuario});
}

