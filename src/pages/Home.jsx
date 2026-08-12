import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, PackageCheck, Sparkles } from "lucide-react";
import styled from "styled-components";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import { Button, Container, ErrorState, Section, SectionHeader, SkeletonGrid } from "../components/UI";

const Hero = styled.section`padding:36px 0 24px;`;
const HeroBox = styled(Container)`min-height:480px;border-radius:26px;background:linear-gradient(100deg,rgba(20,52,35,.96) 0%,rgba(28,78,50,.83) 50%,rgba(28,78,50,.12) 100%),url('https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=85') center/cover;display:flex;align-items:center;color:white;padding:64px;position:relative;overflow:hidden;@media(max-width:650px){padding:38px 26px;min-height:420px}`;
const Copy = styled.div`max-width:600px;position:relative;z-index:1;.tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.13);padding:8px 13px;border-radius:30px;font-size:.84rem}h1{font-size:clamp(2.5rem,5vw,4.5rem);line-height:1.02;letter-spacing:-.065em;margin:22px 0 18px}p{font-size:1.08rem;color:#dbe7de;line-height:1.65;max-width:510px}${Button}{background:#ef9a53;color:#173e2a;padding:14px 21px;margin-top:12px}`;
const CategoryGrid = styled.div`display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;`;
const Category = styled(Link)`background:white;border:1px solid #e1e7e1;border-radius:16px;padding:20px;display:flex;align-items:center;gap:13px;font-weight:700;transition:.2s;&:hover{border-color:#72a686;transform:translateY(-3px)}span{width:42px;height:42px;border-radius:12px;background:#e8f1e7;display:grid;place-items:center;color:#277049}`;
const ProductGrid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:20px;`;
const Benefits = styled(Container)`display:grid;grid-template-columns:repeat(3,1fr);background:#e9f1e7;border-radius:20px;padding:30px;gap:30px;margin-top:28px;div{display:flex;gap:13px;align-items:center}h3{font-size:1rem;margin:0 0 3px}p{font-size:.86rem;color:#647067;margin:0}@media(max-width:700px){grid-template-columns:1fr}`;

export default function Home(){const [products,setProducts]=useState([]);const[categories,setCategories]=useState([]);const[loading,setLoading]=useState(true);const[error,setError]=useState("");const load=()=>{setLoading(true);Promise.all([getProducts(),getCategories()]).then(([p,c])=>{setProducts(p);setCategories(c)}).catch(()=>setError("Não foi possível carregar a vitrine." )).finally(()=>setLoading(false))};useEffect(load,[]);return <>
  <Hero><HeroBox><Copy><span className="tag"><Sparkles size={16}/> Novidades que combinam com você</span><h1>Seu próximo favorito está aqui.</h1><p>Uma seleção simples, bonita e cheia de possibilidades para renovar a casa e a rotina.</p><Button as={Link} to="/produtos">Explorar produtos <ArrowRight size={18}/></Button></Copy></HeroBox></Hero>
  <Section $compact><Container><SectionHeader><div><h2>Compre por categoria</h2><p>Encontre mais rápido o que procura.</p></div><Link to="/categorias">Ver todas →</Link></SectionHeader><CategoryGrid>{categories.map((category,i)=><Category key={category.id} to={`/produtos?categoria=${category.id}`}><span>{String(i+1).padStart(2,"0")}</span>{category.nome}</Category>)}</CategoryGrid></Container></Section>
  <Section><Container><SectionHeader><div><h2>Destaques da semana</h2><p>Os produtos que estão chamando atenção.</p></div><Link to="/produtos">Ver catálogo →</Link></SectionHeader>{loading?<SkeletonGrid count={4}/>:error?<ErrorState message={error} onRetry={load}/>:<ProductGrid>{products.slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</ProductGrid>}</Container></Section>
  <Benefits><div><BadgeCheck/><span><h3>Compra protegida</h3><p>Seus dados sempre bem cuidados</p></span></div><div><PackageCheck/><span><h3>Pedidos organizados</h3><p>Acompanhe cada compra em um só lugar</p></span></div><div><Sparkles/><span><h3>Novidades para você</h3><p>Uma seleção feita para a sua rotina</p></span></div></Benefits>
  {products.length>4&&<Section><Container><SectionHeader><div><h2>Em alta agora</h2><p>Mais ideias para você descobrir.</p></div></SectionHeader><ProductGrid>{products.slice(4,8).map(p=><ProductCard key={p.id} product={p}/>)}</ProductGrid></Container></Section>}
  </>}
