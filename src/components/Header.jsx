import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import styled from "styled-components";
import { Container } from "./UI";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Top = styled.div`background: #173e2a; color: #dce9df; font-size: .84rem; text-align: center; padding: 8px;`;
const Shell = styled.header`background: rgba(255,255,255,.96); border-bottom: 1px solid #e3e8e3; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(10px);`;
const Bar = styled(Container)`height: 76px; display: flex; align-items: center; gap: 36px;`;
const Brand = styled(Link)`font-family: Manrope; font-size: 1.45rem; font-weight: 800; color: #173e2a; letter-spacing: -.05em; span { color: #ef8f42; }`;
const Nav = styled.nav`display: flex; gap: 24px; a { font-weight: 600; color: #536159; } a.active, a:hover { color: #1d5c3a; } @media(max-width:850px){display:none;}`;
const SearchForm = styled.form`
  margin-left: auto; width: min(300px, 26vw); position: relative; input { width: 100%; border: 1px solid #dfe5df; background:#f5f7f4; border-radius: 30px; padding: 11px 42px 11px 16px; outline:0; }
  button { position:absolute; right:7px; top:5px; border:0; background:transparent; padding:6px; cursor:pointer; color:#536159; }
  @media(max-width:700px){ display:none; }
`;
const Actions = styled.div`display:flex; gap:8px; a { width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#f0f3ef;position:relative; } b { position:absolute;right:-4px;top:-5px;background:#ef8f42;color:#fff;font-size:.67rem;min-width:18px;height:18px;border-radius:10px;display:grid;place-items:center; }`;

export default function Header() {
  const { itemCount } = useCart(); const { isAuthenticated, user } = useAuth(); const navigate = useNavigate();
  const search = (event) => { event.preventDefault(); const query = new FormData(event.currentTarget).get("q"); navigate(`/produtos${query ? `?busca=${encodeURIComponent(query)}` : ""}`); };
  return <><Top>Ofertas especiais todos os dias • Compra simples e segura</Top><Shell><Bar>
    <Brand to="/">nexo<span>.</span></Brand>
    <Nav><NavLink to="/">Início</NavLink><NavLink to="/produtos">Produtos</NavLink><NavLink to="/categorias">Categorias</NavLink><NavLink to="/pedidos">Pedidos</NavLink>{user?.roles === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}</Nav>
    <SearchForm onSubmit={search}><input name="q" placeholder="Buscar produtos" aria-label="Buscar produtos"/><button aria-label="Buscar"><Search size={19}/></button></SearchForm>
    <Actions><Link to={isAuthenticated ? "/perfil" : "/login"} aria-label="Perfil"><UserRound size={20}/></Link><Link to="/carrinho" aria-label="Carrinho"><ShoppingBag size={20}/>{itemCount > 0 && <b>{itemCount}</b>}</Link></Actions>
  </Bar></Shell></>;
}
