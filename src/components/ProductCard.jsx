import { Link } from "react-router-dom";
import { Plus, ImageOff } from "lucide-react";
import styled from "styled-components";
import { formatCurrency } from "../utils/format";
import { useCart } from "../contexts/CartContext";

const Card = styled.article`background:#fff;border:1px solid #e5e9e4;border-radius:18px;overflow:hidden;transition:.25s;position:relative;&:hover{transform:translateY(-5px);box-shadow:0 16px 36px rgba(35,65,44,.1);}`;
const Pic = styled(Link)`height:230px;background:#eef1ed;display:grid;place-items:center;overflow:hidden;img{width:100%;height:100%;object-fit:cover;transition:.4s} ${Card}:hover & img{transform:scale(1.04)}`;
const Info = styled.div`padding:18px; h3{font-size:1rem;margin-bottom:7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis} p{color:#748077;font-size:.86rem;height:38px;overflow:hidden;margin-bottom:14px} div{display:flex;align-items:center;justify-content:space-between} strong{font-size:1.12rem;color:#173e2a}`;
const Add = styled.button`width:38px;height:38px;border-radius:50%;border:0;background:#1d5c3a;color:white;display:grid;place-items:center;cursor:pointer;&:hover{background:#ef8f42}`;
export default function ProductCard({ product }){const {addItem}=useCart();return <Card><Pic to={`/produto/${product.id}`}>{product.imgUrl?<img src={product.imgUrl} alt={product.nome}/>:<ImageOff/>}</Pic><Info><h3>{product.nome}</h3><p>{product.descricao}</p><div><strong>{formatCurrency(product.preco)}</strong><Add onClick={()=>addItem(product)} aria-label={`Adicionar ${product.nome}`}><Plus size={19}/></Add></div></Info></Card>}
