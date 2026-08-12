import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import styled from "styled-components";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import { Container, EmptyState, ErrorState, Input, Section, Select, SkeletonGrid } from "../components/UI";

const Head = styled.div`background:#e8efe6;padding:48px 0 40px;h1{font-size:2.5rem;margin-bottom:8px}p{color:#647067;margin:0}`;
const Controls = styled.div`display:grid;grid-template-columns:1fr auto auto;gap:12px;margin-bottom:24px;.search{position:relative}.search svg{position:absolute;right:13px;top:13px;color:#7a857d}@media(max-width:700px){grid-template-columns:1fr}`;
const Grid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:20px;`;
const Count = styled.p`color:#667168;font-size:.9rem;margin:0 0 16px;`;
export default function Products(){const[params,setParams]=useSearchParams();const[products,setProducts]=useState([]);const[categories,setCategories]=useState([]);const[loading,setLoading]=useState(true);const[error,setError]=useState("");const category=params.get("categoria")||"";const query=params.get("busca")||"";const order=params.get("ordem")||"relevancia";
  const load=()=>{setLoading(true);setError("");Promise.all([getProducts(category),getCategories()]).then(([p,c])=>{setProducts(p);setCategories(c)}).catch(()=>setError("Não foi possível carregar o catálogo agora.")).finally(()=>setLoading(false))};useEffect(load,[category]);
  const shown=useMemo(()=>{const list=products.filter(p=>`${p.nome} ${p.descricao}`.toLowerCase().includes(query.toLowerCase()));if(order==="menor"){list.sort((a,b)=>a.preco-b.preco)}if(order==="maior"){list.sort((a,b)=>b.preco-a.preco)}if(order==="nome"){list.sort((a,b)=>a.nome.localeCompare(b.nome))}return list},[products,query,order]);
  const set=(key,value)=>{const next=new URLSearchParams(params);if(value){next.set(key,value)}else{next.delete(key)}setParams(next)};
  return <><Head><Container><h1>Catálogo</h1><p>Explore todos os produtos disponíveis.</p></Container></Head><Section><Container><Controls><div className="search"><Input value={query} onChange={e=>set("busca",e.target.value)} placeholder="Busque por nome ou descrição"/><Search size={19}/></div><Select value={category} onChange={e=>set("categoria",e.target.value)}><option value="">Todas as categorias</option>{categories.map(c=><option key={c.id} value={c.id}>{c.nome}</option>)}</Select><Select value={order} onChange={e=>set("ordem",e.target.value)}><option value="relevancia">Relevância</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="nome">Nome A–Z</option></Select></Controls>{loading?<SkeletonGrid/>:error?<ErrorState message={error} onRetry={load}/>:shown.length===0?<EmptyState title="Nenhum produto encontrado" message="Tente mudar sua busca ou categoria."/>:<><Count>{shown.length} {shown.length===1?"produto encontrado":"produtos encontrados"}</Count><Grid>{shown.map(p=><ProductCard key={p.id} product={p}/>)}</Grid></>}</Container></Section></>}
