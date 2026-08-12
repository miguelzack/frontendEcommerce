import AppRoutes from "./routes/AppRoutes";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App(){return <ToastProvider><AuthProvider><CartProvider><GlobalStyles/><AppRoutes/></CartProvider></AuthProvider></ToastProvider>}
