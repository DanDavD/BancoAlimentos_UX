import axiosInstance from './axiosInstance';

export function getAllProducts(){
    return axiosInstance.get('/api/Inventario/');
}
export function getAllSucursales(){
    return axiosInstance.get('/api/Inventario/sucursales');
}

export function abastecerPorSucursalProducto(id_sucursal, id_producto, cantidad, modo='sumar', etiquetas){
    return axiosInstance.put(`/api/Inventario/abastecer/sucursal/${id_sucursal}/producto/${id_producto}`, {cantidad, modo, etiquetas});
}   

export function getProductosDestacados(){
    return axiosInstance.get('/api/producto/destacados');
}

export function getProductosTendencias(){
    return axiosInstance.get('/api/producto/tendencias');
}

export function getProductoById(id){   
    return axiosInstance.get(`/api/producto/${id}`);
}
export function getImagenesProducto(id){   
    return axiosInstance.get(`/api/producto/${id}/imagenes`);
}   