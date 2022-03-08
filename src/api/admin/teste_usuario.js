import api from "./axios_service.js";

export async function fetchTestesUsuarios(filtros) {
  const response = await api.get(
    `/admin/teste-usuario${filtros ? filtros : ""}`
  );
  return response.data.result;
}

export async function fetchTesteUsuario(id) {
  const response = await api.get(`/admin/teste-usuario/${id}`);
  return response.data.result;
}

export function putTesteUsuario(id, usuario) {
  return api.put(`/admin/teste-usuario/${id}`, usuario);
}

export function postTesteUsuario(usuario) {
  return api.post(`/admin/teste-usuario/add`, usuario);
}
