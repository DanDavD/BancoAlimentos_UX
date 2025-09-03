import axiosInstance from './axiosInstance';

// Acepta { correo, contraseña } o { correo, contrasena } (sin ñ)
export default function LoginUser({ correo, contraseña, contrasena }) {
  const pass = contraseña ?? contrasena;
  return axiosInstance.post('/api/auth/login', { correo, contraseña: pass });
}
