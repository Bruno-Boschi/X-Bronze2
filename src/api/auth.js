import api from "./axios_service.js";

export async function login(usuario) {
  const response = await api.post("/login", {
    //aqui, ao receber /login e info.usuarios ele manda para o axios_services.js pelo post onde aguarda um retorno
    email: usuario.email,
    password: usuario.password,
  });
  return response.data;
}

export async function profile() {
  //solitica para o axios_service o profile gerado apos login dar certo
  const response = await api.get("/profile");
  return response.data.result;
}
