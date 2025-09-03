import axiosInstance from './axiosInstance';

export default function LoginUser({ correo, contraseña, contrasena }) {
  const pass = contraseña ;
  if (!correo || !pass) {
    return Promise.reject(new Error('Faltan credenciales'));
  }
  return axiosInstance.post('/api/auth/login', { correo, contraseña: pass });
}

export function RegistrarUser({ nombre, correo, contraseña, id_rol, telefono }) {
  if (!nombre || !correo || !contraseña) {
    return Promise.reject(new Error('Faltan datos obligatorios'));
  }
  return axiosInstance.post('/api/registrarse', {
    nombre, correo, contraseña, telefono, id_rol
  });
}

export function InformacionUser (id){
  return axiosInstance.get('/api/MiPerfil/info/${id}');
}
export function InformacionRole (id_role){
  return axiosInstance.get(`/api/MiPerfil/info/role/${id_role}`);
}
export function EditProfile (payload){
  return axiosInstance.put('/api/MiPerfil/perfil', payload);
}

export function updateUserById (id, payload){
  return axiosInstance.put(`/api/MiPerfil/perfil/${id}`, payload);
}
