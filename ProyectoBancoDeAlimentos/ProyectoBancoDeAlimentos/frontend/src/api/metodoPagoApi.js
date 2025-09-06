import axiosInstance from "./axiosInstance";

//
export function getAllMetodoPago() {
  return axiosInstance.get("/api/metodoPago/");
}

export function createMetodoPago(payload) {
  return axiosInstance.post("/api/metodoPago/", payload);
}

export function updateMetodoPago(id, payload) {
  return axiosInstance.put(`/api/metodoPago/${id}`, payload);
}

export function deleteMetodoPago(id) {
  return axiosInstance.delete(`/api/metodoPago/${id}`);
}
