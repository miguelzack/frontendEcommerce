import { Link } from "react-router-dom";
import { Camera, Mail, ShieldCheck } from "lucide-react";
import styled from "styled-components";
import { Container } from "./UI";

const Foot = styled.footer`background:#142d20;color:#e7eee9;padding:54px 0 24px;margin-top:60px;`;
const Grid = styled(Container)`display:grid;grid-template-columns:2fr 1fr 1fr;gap:60px; h3{font-size:1.55rem;margin-bottom:10px} h4{margin-top:4px} p,a{color:#aebdb3;line-height:1.7} a{display:block;margin:8px 0} @media(max-width:700px){grid-template-columns:1fr;gap:26px}`;
const Bottom = styled(Container)`border-top:1px solid #31513d;margin-top:34px;padding-top:20px;color:#91a296;font-size:.85rem;display:flex;justify-content:space-between;`;
export default function Footer(){return <Foot><Grid><div><h3>nexo.</h3><p>Produtos que combinam com a sua rotina, reunidos em uma experiência simples e acolhedora.</p></div><div><h4>Navegue</h4><Link to="/produtos">Produtos</Link><Link to="/categorias">Categorias</Link><Link to="/pedidos">Meus pedidos</Link></div><div><h4>Atendimento</h4><p><Mail size={16}/> contato@nexo.com</p><p><Camera size={16}/> @lojameunexo</p><p><ShieldCheck size={16}/> Ambiente protegido</p></div></Grid><Bottom><span>© 2026 Nexo.</span><span>Feito para as suas melhores escolhas</span></Bottom></Foot>}
