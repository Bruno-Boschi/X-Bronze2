import api from "../axios_service.js";

export async function all() {
  const response = await api.get(`/encontros`);
  return response.data.result;
}

export async function one(id) {
  const response = await api.get(`/encontros/${id}`);
  return response.data.result;
}

// export function putUsuario(id, usuario) {
//   return api.post(`/usuarios/${id}`, usuario);
// }

// export function postUsuario(usuario) {
//   return api.post(`/usuarios/add`, usuario);
// }

// export function postUsuarioCadastro(usuario) {
//   return api.post(`/usuarios-cadastro/add`, usuario);
// }

// export function postSenhaCadastro(usuario) {
//   return api.post(`/senha-cadastro`, usuario);
// }
