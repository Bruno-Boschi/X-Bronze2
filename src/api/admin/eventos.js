import api from "../axios_service.js";

export function deleteEncontro(id) {
  return api.delete(`/admin/encontros/${id}`);
}
export function postEncontro(encontro) {
  return api.post(`/admin/encontros/add`, encontro);
}

export function putEncontro(id, encontro) {
  return api.post(`/admin/encontros/${id}`, encontro);
}

// export function postUsuarioCadastro(usuario) {
//   return api.post(`/usuarios-cadastro/add`, usuario);
// }

// export function postSenhaCadastro(usuario) {
//   return api.post(`/senha-cadastro`, usuario);
// }
