import axiosInstance from './axiosInstance';

export function getHistorialComprasProductos() {
  return axiosInstance.get('/api/pedidos/get-historial');
}
