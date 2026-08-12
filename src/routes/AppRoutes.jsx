import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import { LoginPage, RegisterPage } from "../pages/AuthPages";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import ProductsAdmin from "../pages/Admin/ProductsAdmin";
import ProductForm from "../pages/Admin/ProductForm";
import UsersAdmin from "../pages/Admin/UsersAdmin";
import UserDetails from "../pages/Admin/UserDetails";
import OrdersAdmin from "../pages/Admin/OrdersAdmin";
import OrderDetails from "../pages/Admin/OrderDetails";
import PaymentsAdmin from "../pages/Admin/PaymentsAdmin";

export default function AppRoutes(){return <BrowserRouter><Routes><Route path="/login" element={<LoginPage/>}/><Route path="/cadastro" element={<RegisterPage/>}/><Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>}><Route index element={<Dashboard/>}/><Route path="produtos" element={<ProductsAdmin/>}/><Route path="produtos/novo" element={<ProductForm/>}/><Route path="produtos/:id/editar" element={<ProductForm/>}/><Route path="usuarios" element={<UsersAdmin/>}/><Route path="usuarios/:id" element={<UserDetails/>}/><Route path="pedidos" element={<OrdersAdmin/>}/><Route path="pedidos/:id" element={<OrderDetails/>}/><Route path="pagamentos" element={<PaymentsAdmin/>}/></Route><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/produtos" element={<Products/>}/><Route path="/produto/:id" element={<ProductDetails/>}/><Route path="/categorias" element={<Categories/>}/><Route path="/carrinho" element={<Cart/>}/><Route path="/pagamento/:pedidoId" element={<PrivateRoute><Payment/></PrivateRoute>}/><Route path="/pedidos" element={<PrivateRoute><Orders/></PrivateRoute>}/><Route path="/perfil" element={<PrivateRoute><Profile/></PrivateRoute>}/><Route path="*" element={<NotFound/>}/></Route></Routes></BrowserRouter>}
