import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Grid3X3 } from "lucide-react";
import styled from "styled-components";
import { getCategories } from "../services/categoryService";
import { Container, ErrorState, Loading, Section } from "../components/UI";
const Head=styled.div`background:#173e2a;color:white;padding:55px 0;h1{font-size:2.6rem;margin-bottom:8px}p{color:#c7d8cc;margin:0}`;
const Grid=styled.div`display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;`;
const Cat=styled(Link)`min-height:180px;border-radius:20px;background:${({$i})=>["#e5eee2","#f3e6d8","#e1e9ed","#eee6ef","#eee9d8"][$i%5]};padding:25px;display:flex;flex-direction:column;justify-content:space-between;transition:.2s;h2{font-size:1.25rem;margin:0}div{display:flex;justify-content:space-between;align-items:center}&:hover{transform:translateY(-4px);box-shadow:0 15px 35px rgba(30,60,40,.1)}`;
export default function Categories(){const[data,setData]=useState([]);const[loading,setLoading]=useState(true);const[error,setError]=useState("");const load=()=>{setLoading(true);getCategories().then(setData).catch(()=>setError("Não foi possível carregar as categorias.")).finally(()=>setLoading(false))};useEffect(load,[]);return <><Head><Container><h1>Categorias</h1><p>Um atalho para encontrar exatamente o que você precisa.</p></Container></Head><Section><Container>{loading?<Loading small/>:error?<ErrorState message={error} onRetry={load}/>:<Grid>{data.map((c,i)=><Cat $i={i} key={c.id} to={`/produtos?categoria=${c.id}`}><Grid3X3/><div><h2>{c.nome}</h2><ArrowUpRight/></div></Cat>)}</Grid>}</Container></Section></>}
