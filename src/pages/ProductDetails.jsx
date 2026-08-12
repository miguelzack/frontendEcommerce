import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ChevronLeft, Minus, Plus, ShoppingBag, ShieldCheck} from "lucide-react";
import styled from "styled-components";
import {getProductById, getProducts} from "../services/productService";
import {getCategories} from "../services/categoryService";
import {useCart} from "../contexts/CartContext";
import {Button, Container, ErrorState, Loading, Section, SectionHeader} from "../components/UI";
import ProductCard from "../components/ProductCard";
import {formatCurrency} from "../utils/format";

const Detail = styled.div`display: grid;
    grid-template-columns:1.05fr .95fr;
    gap: 60px;
    align-items: start;

    .image {
        background: #eef1ed;
        border-radius: 24px;
        overflow: hidden;
        aspect-ratio: 1;
        display: grid;
        place-items: center
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover
    }

    .crumb {
        color: #657169;
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 25px
    }

    .tag {
        color: #267149;
        font-weight: 700;
        font-size: .86rem;
        text-transform: uppercase;
        letter-spacing: .06em
    }

    h1 {
        font-size: clamp(2rem, 4vw, 3.4rem);
        line-height: 1.05;
        letter-spacing: -.055em;
        margin: 13px 0 15px
    }

    .description {
        color: #647068;
        line-height: 1.75
    }

    .price {
        font: 800 2rem Manrope;
        color: #17462d;
        margin: 25px 0
    }

    .stock {
        color: #29744d;
        font-weight: 700
    }

    .buy {
        display: flex;
        gap: 12px;
        margin: 28px 0
    }

    .qty {
        display: flex;
        align-items: center;
        border: 1px solid #d9e0da;
        border-radius: 12px;
        background: white
    }

    .qty button {
        border: 0;
        background: transparent;
        width: 40px;
        cursor: pointer
    }

    .qty span {
        width: 34px;
        text-align: center
    }

    .safe {
        display: flex;
        gap: 10px;
        color: #657169;
        font-size: .9rem;
        border-top: 1px solid #e2e7e2;
        padding-top: 22px
    }

    @media (max-width: 800px) {
        grid-template-columns:1fr;
        gap: 30px
    }`;
const Grid = styled.div`display: grid;
    grid-template-columns:repeat(auto-fill, minmax(230px, 1fr));
    gap: 20px;`;
export default function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [categories, setCategories] = useState([]);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {addItem} = useCart();
    const load = () => {
        setLoading(true);
        Promise.all([getProductById(id), getProducts(), getCategories()]).then(([p, all, c]) => {
            setProduct(p);
            setCategories(c);
            setRelated(all.filter(x => x.id !== p.id && x.categoriaIds?.some(cid => p.categoriaIds?.includes(cid))).slice(0, 4))
        }).catch(() => setError("Produto não encontrado ou indisponível.")).finally(() => setLoading(false))
    };
    useEffect(load, [id]);
    if (loading) return <Loading text="Carregando produto..."/>;
    if (error) return <Container><ErrorState message={error} onRetry={load}/></Container>;
    const names = categories.filter(c => product.categoriaIds?.includes(c.id)).map(c => c.nome).join(", ") || "Sem categoria";
    return <><Section><Container><Detail>
        <div className="image">{product.imgUrl ? <img src={product.imgUrl} alt={product.nome}/> :
            <ShoppingBag size={60}/>}</div>
        <div><Link className="crumb" to="/produtos"><ChevronLeft size={17}/> Voltar ao catálogo</Link><span
            className="tag">{names}</span><h1>{product.nome}</h1><p className="description">{product.descricao}</p><p
            className="price">{formatCurrency(product.preco)}</p><p className="stock">Disponível para compra</p>
            <div className="buy">
                <div className="qty">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={17}/></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(qty + 1)}><Plus size={17}/></button>
                </div>
                <Button onClick={() => addItem(product, qty)}><ShoppingBag size={18}/>Adicionar ao carrinho</Button>
            </div>
            <div className="safe"><ShieldCheck size={21}/><span>Compra segura e protegida do início ao fim.</span></div>
        </div>
    </Detail></Container></Section>{related.length > 0 && <Section $compact><Container><SectionHeader>
        <div><h2>Você também pode gostar</h2><p>Outros produtos da mesma categoria.</p></div>
    </SectionHeader><Grid>{related.map(p => <ProductCard key={p.id} product={p}/>)}</Grid></Container></Section>}</>
}
