export const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) || 0);

export const formatDate = (value) => {
  if (!value) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
};

export const today = () => new Date().toISOString().slice(0, 10);

export const getErrorMessage = (error, fallback = "Não foi possível concluir a operação.") => {
  if (error.response?.status === 403) return "Você não possui permissão para realizar esta ação.";
  if (error.response?.status === 401) return "Sua sessão expirou. Entre novamente.";
  const data = error.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  return data?.message || data?.erro || fallback;
};
