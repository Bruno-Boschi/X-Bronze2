import { format, parseISO } from "date-fns";

export function dateFormat(date, formato) {
  if (date) {
    return format(parseISO(date), formato);
  } else {
    return "";
  }
}

export function status(valor) {
  let result = "";
  switch (valor) {
    case 0:
      result = "Inactivo";
      break;
    case 1:
      result = "Activo";
      break;
  }
  return result;
}
export function justificado(valor) {
  let result = "";
  switch (valor) {
    case false:
      result = "No";
      break;
    case true:
      result = "Si";
      break;
  }
  return result;
}

export function estado_civil(valor) {
  let result = "";
  switch (valor) {
    case 0:
      result = "No casado";
      break;
    case 1:
      result = "Casado";
      break;
    case 2:
      result = "Viudo(a)";
      break;
  }
  return result;
}

export function excerpt(text, number) {
  if (!text) return;
  if (text.length > number) {
    return text.substr(0, number) + "...";
  } else {
    return text;
  }
}

export function inputRequired(value) {
  if (
    Object.is(value, null) ||
    Object.is(value, undefined) ||
    Object.is(value, "")
  ) {
    return "Obligatorio";
  } else {
    return true;
  }
}

export function validaEmail(value) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Email Inválido";
}
