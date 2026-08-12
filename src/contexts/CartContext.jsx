/* oxlint-disable react/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("nexo_cart") || "[]"));
  const { showToast } = useToast();
  const save = (next) => { setItems(next); localStorage.setItem("nexo_cart", JSON.stringify(next)); };

  const addItem = (product, quantity = 1) => {
    const existing = items.find((item) => item.id === product.id);
    save(existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }]);
    showToast("Produto adicionado ao carrinho.");
  };
  const updateQuantity = (id, quantity) => quantity < 1 ? removeItem(id) : save(items.map((item) => item.id === id ? { ...item, quantity } : item));
  const removeItem = (id) => { save(items.filter((item) => item.id !== id)); showToast("Produto removido do carrinho."); };
  const clearCart = () => save([]);
  const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.preco) * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, total, itemCount, addItem, updateQuantity, removeItem, clearCart }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
