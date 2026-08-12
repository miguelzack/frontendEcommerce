/* oxlint-disable react/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import styled from "styled-components";

const ToastContext = createContext(null);
const Stack = styled.div`position: fixed; right: 28px; top: 92px; z-index: 1000; display: grid; gap: 10px;`;
const ToastBox = styled.div`
  width: min(380px, calc(100vw - 32px)); padding: 15px 16px; border-radius: 14px; color: #17211a;
  background: #fff; box-shadow: 0 16px 50px rgba(24, 52, 35, .18); border-left: 4px solid ${({ $type }) => $type === "error" ? "#d84a4a" : "#2f855a"};
  display: flex; align-items: center; gap: 11px; animation: enter .25s ease;
  svg { color: ${({ $type }) => $type === "error" ? "#d84a4a" : "#2f855a"}; flex: 0 0 auto; }
  button { margin-left: auto; border: 0; background: transparent; cursor: pointer; color: #6c766f; }
  @keyframes enter { from { transform: translateX(18px); opacity: 0; } }
`;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items, { id, message, type }]);
    setTimeout(() => remove(id), 3500);
  }, [remove]);

  return <ToastContext.Provider value={{ showToast }}>
    {children}
    <Stack>{toasts.map((toast) => <ToastBox key={toast.id} $type={toast.type}>
      {toast.type === "error" ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
      <span>{toast.message}</span><button aria-label="Fechar" onClick={() => remove(toast.id)}><X size={17}/></button>
    </ToastBox>)}</Stack>
  </ToastContext.Provider>;
}

export const useToast = () => useContext(ToastContext);
