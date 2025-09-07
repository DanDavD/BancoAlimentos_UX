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

export function forgetPassword (correo){
  return axiosInstance.post('/api/forget-password/', {correo});
}

export function validarCodigo (correo, codigo){
  return axiosInstance.post('/api/validar-codigo/', {correo, codigo});
}
export function changePassword (mail, new_password){
  return axiosInstance.patch('/api/forget-password/cambiar-password', {mail, new_password});
}