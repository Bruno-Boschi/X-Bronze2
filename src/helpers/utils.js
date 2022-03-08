export function inputRequired(value) {
  if (
    Object.is(value, null) ||
    Object.is(value, undefined) ||
    Object.is(value, "")
  ) {
    return "Obrigatório";
  } else {
    return true;
  }
}

export function validaEmail(value) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Email Inválido";
}
