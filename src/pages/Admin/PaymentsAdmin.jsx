import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { getPayments } from "../../services/paymentService";
import { AdminCard, Badge, PageHead, TableWrap } from "../../components/admin/AdminUI";
import { EmptyState, ErrorState, Loading } from "../../components/UI";
import { formatDate } from "../../utils/format";
export default function PaymentsAdmin(){const[data,setData]=useState([]);const[loading,setLoading]=useState(true);const[error,setError]=useState("");const load=()=>{setLoading(true);getPayments().then(setData).catch(()=>setError("Não foi possível carregar os pagamentos.")).finally(()=>setLoading(false))};useEffect(load,[]);return <><PageHead><div><h2>Pagamentos</h2><p>Consulte as confirmações registradas.</p></div></PageHead>{loading?<Loading small/>:error?<ErrorState message={error} onRetry={load}/>:data.length===0?<EmptyState title="Nenhum pagamento registrado"/>:<AdminCard><TableWrap><table><thead><tr><th>Pagamento</th><th>Pedido</th><th>Data</th><th>Status</th><th>Ação</th></tr></thead><tbody>{data.map(p=><tr key={p.id}><td className="id">#{p.id}</td><td className="id">#{p.pedido_id}</td><td>{formatDate(p.momento)}</td><td><Badge>Confirmado</Badge></td><td><Link className="icon-btn" to={`/admin/pedidos/${p.pedido_id}`} title="Ver pedido"><Eye size={17}/></Link></td></tr>)}</tbody></table></TableWrap></AdminCard>}</>}
