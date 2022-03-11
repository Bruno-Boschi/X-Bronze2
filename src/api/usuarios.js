import api from "./axios_service.js";

export async function all(filtros) {
  const response = await api.get(`/admin/usuarios${filtros ? filtros : ""}`);
  return response.data.result;
}

export async function one(id) {
  const response = await api.get(`/admin/usuarios/${id}`);
  return response.data.result;
}

export function putUsuario(id, usuario) {
  return api.post(`/admin/usuarios/${id}`, usuario);
}

export function postUsuario(usuario) {
  return api.post(`/admin/usuarios/add`, usuario);
}

export function postUsuarioCadastro(usuario) {
  return api.post(`/usuarios-cadastro/add`, usuario);
}

export function postSenhaCadastro(usuario) {
  return api.post(`/senha-cadastro`, usuario);
}

export async function uploadAvatar(id, fd) {
  const response = await api.post(`/usuarios/${id}/avatar`, fd);
  return response;
}

export async function fetchRamosTrabalho(filtros) {
  const response = await api.get(
    `/admin/usuarios-ramo-atividade${filtros ? filtros : ""}`
  );
  return response.data.result;
}

export async function fetchUsuariosHome(filtros) {
  const response = await api.get(`/usuarios-home${filtros ? filtros : ""}`);
  return response.data.result;
}
