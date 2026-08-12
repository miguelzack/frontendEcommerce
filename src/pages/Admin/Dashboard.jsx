import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Boxes, CreditCard, Package, Users } from "lucide-react";
import styled from "styled-components";
import { getProducts } from "../../services/productService";
import { getUsers } from "../../services/userService";
import { getOrders } from "../../services/orderService";
import { getPayments } from "../../services/paymentService";
import { ErrorState, Loading } from "../../components/UI";
import { PageHead } from "../../components/admin/AdminUI";

const Grid=styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:28px;@media(max-width:1050px){grid-template-columns:repeat(2,1fr)}@media(max-width:550px){grid-template-columns:1fr}`;
const Metric=styled(Link)`background:white;border:1px solid #e1e6e1;border-radius:17px;padding:21px;display:block;transition:.2s;&:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(30,60,40,.08)}.top{display:flex;justify-content:space-between;color:#6c776f}.icon{width:42px;height:42px;border-radius:12px;background:#e8f1e7;color:#286d47;display:grid;place-items:center}.value{font:800 2.15rem Manrope;margin:20px 0 4px}.label{color:#647068;font-size:.9rem}`;
const Welcome=styled.div`background:linear-gradient(110deg,#173e2a,#286747);color:white;border-radius:20px;padding:30px;h3{font-size:1.5rem;margin-bottom:8px}p{color:#c8dbce;margin:0;max-width:620px;line-height:1.6}`;
export default function Dashboard(){const[data,setData]=useState(null);const[error,setError]=useState("");const load=()=>{setError("");Promise.all([getProducts(),getUsers(),getOrders(),getPayments()]).then(([products,users,orders,payments])=>setData({products,users,orders,payments})).catch(()=>setError("Não foi possível carregar os indicadores."))};useEffect(load,[]);if(error)return <ErrorState message={error} onRetry={load}/>;if(!data)return <Loading small text="Carregando indicadores..."/>;const cards=[{label:"Produtos",value:data.products.length,icon:Boxes,to:"/admin/produtos"},{label:"Usuários",value:data.users.length,icon:Users,to:"/admin/usuarios"},{label:"Pedidos",value:data.orders.length,icon:Package,to:"/admin/pedidos"},{label:"Pagamentos",value:data.payments.length,icon:CreditCard,to:"/admin/pagamentos"}];return <><PageHead><div><h2>Visão geral</h2><p>Acompanhe os principais números da loja.</p></div></PageHead><Grid>{cards.map(({label,value,icon:Icon,to})=><Metric to={to} key={label}><div className="top"><span className="icon"><Icon size={21}/></span><ArrowUpRight size={19}/></div><div className="value">{value}</div><div className="label">{label}</div></Metric>)}</Grid><Welcome><h3>Olá, administrador!</h3><p>Use o menu lateral para gerenciar o catálogo, consultar clientes, acompanhar pedidos e visualizar pagamentos.</p></Welcome></>}
