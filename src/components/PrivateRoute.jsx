import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./UI";
export default function PrivateRoute({children}){const {isAuthenticated,loading}=useAuth();const location=useLocation();if(loading)return <Loading text="Recuperando sua sessão..."/>;return isAuthenticated?children:<Navigate to="/login" replace state={{from:location.pathname}}/>}
