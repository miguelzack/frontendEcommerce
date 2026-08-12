import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {Eye, Pencil, Plus, Search, Trash2} from "lucide-react";
import {getProducts, deleteProduct} from "../../services/productService";
import {getCategories} from "../../services/categoryService";
import {useToast} from "../../contexts/ToastContext";
import {Button, EmptyState, ErrorState, Input, Loading} from "../../components/UI";
import {AdminCard, ConfirmModal, PageHead, TableWrap, Toolbar} from "../../components/admin/AdminUI";
import {formatCurrency, getErrorMessage} from "../../utils/format";

export default function ProductsAdmin() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [target, setTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const {showToast} = useToast();
    const load = () => {
        setLoading(true);
        setError("");
        Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
            setProducts(p);
            setCategories(c)
        }).catch(() => setError("Não foi possível carregar os produtos.")).finally(() => setLoading(false))
    };
    useEffect(load, []);
    const names = useMemo(() => Object.fromEntries(categories.map(c => [c.id, c.nome])), [categories]);
    const shown = products.filter(p => p.nome.toLowerCase().includes(query.toLowerCase()));
    const remove = async () => {
        if (deleting || !target) return;
        const productId = target.id;
        setDeleting(true);
        try {
            await deleteProduct(productId);
            setProducts(current => current.filter(product => product.id !== productId));
            showToast("Produto excluído com sucesso.");
            setTarget(null);
        } catch (err) {
            showToast(getErrorMessage(err, "Não foi possível excluir o produto."), "error")
        } finally {
            setDeleting(false)
        }
    };
    return <><PageHead>
        <div><h2>Produtos</h2><p>Gerencie os itens disponíveis na loja.</p></div>
        <Button as={Link} to="/admin/produtos/novo"><Plus size={18}/>Novo produto</Button></PageHead><Toolbar>
        <div style={{position: "relative", width: "100%"}}><Input placeholder="Buscar produto" value={query}
                                                                  onChange={e => setQuery(e.target.value)}/><Search
            size={18} style={{position: "absolute", right: 13, top: 13, color: "#778178"}}/></div>
    </Toolbar>{loading ? <Loading small/> : error ? <ErrorState message={error} onRetry={load}/> : shown.length === 0 ?
        <EmptyState title="Nenhum produto encontrado"/> : <AdminCard><TableWrap>
            <table>
                <thead>
                <tr>
                    <th>Produto</th>
                    <th>Categorias</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>{shown.map(p => <tr key={p.id}>
                    <td>
                        <div style={{display: "flex", alignItems: "center", gap: 12}}><img className="thumb"
                                                                                           src={p.imgUrl}
                                                                                           alt=""/><strong>{p.nome}</strong>
                        </div>
                    </td>
                    <td>{p.categoriaIds?.map(id => names[id]).filter(Boolean).join(", ") || "—"}</td>
                    <td><strong>{formatCurrency(p.preco)}</strong></td>
                    <td>
                        <div className="actions"><Link className="icon-btn" to={`/produto/${p.id}`}
                                                       title="Visualizar"><Eye size={17}/></Link><Link
                            className="icon-btn" to={`/admin/produtos/${p.id}/editar`} title="Editar"><Pencil
                            size={17}/></Link>
                            <button className="icon-btn danger" onClick={() => setTarget(p)} title="Excluir"><Trash2
                                size={17}/></button>
                        </div>
                    </td>
                </tr>)}</tbody>
            </table>
        </TableWrap></AdminCard>}{target && <ConfirmModal title="Excluir produto"
                                                          message={`Tem certeza de que deseja excluir “${target.nome}”? Essa ação não poderá ser desfeita.`}
                                                          loading={deleting}
                                                          onCancel={() => !deleting && setTarget(null)}
                                                          onConfirm={remove}/>}</>
}
