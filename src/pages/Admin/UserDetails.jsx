import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import styled from "styled-components";
import { getUserById } from "../../services/userService";
import { Button, Card, EmptyState, Loading } from "../../components/UI";
import { Badge, PageHead } from "../../components/admin/AdminUI";

const Details = styled(Card)`
  padding: 27px;
  max-width: 800px;

  .row { display: grid; grid-template-columns: 34px 1fr; padding: 18px 0; border-bottom: 1px solid #e9ede9; gap: 10px; }
  .row svg { color: #337a54; }
  .row small { display: block; color: #758078; margin-bottom: 4px; }
  .orders { margin-top: 25px; }
  .order { display: flex; justify-content: space-between; gap: 15px; padding: 12px; background: #f5f7f4; border-radius: 10px; margin-top: 8px; }
  .id { font-family: monospace; font-size: .8rem; }
`;

const MessageCard = styled(Card)`
  max-width: 720px;
  padding: 38px;
  text-align: center;

  h3 { margin-bottom: 8px; }
  p { color: #68736b; margin-bottom: 22px; }
  .actions { display: flex; justify-content: center; gap: 10px; }
`;

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotFound(false);

    try {
      const data = await getUserById(id);

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        setNotFound(true);
        setUser(null);
        return;
      }

      setUser(data);
    } catch (requestError) {
      setUser(null);

      if (requestError.response?.status === 404) {
        setNotFound(true);
      } else if (requestError.response?.status === 403) {
        setError("Você não possui permissão para visualizar este usuário.");
      } else {
        setError("Não foi possível carregar os dados do usuário.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // O efeito não retorna a Promise da requisição; retorna apenas undefined.
    loadUser();
  }, [loadUser]);

  if (loading) return <Loading small text="Carregando usuário..." />;

  if (error) {
    return <MessageCard>
      <h3>Não foi possível abrir este usuário</h3>
      <p>{error}</p>
      <div className="actions">
        <Button $secondary as={Link} to="/admin/usuarios"><ArrowLeft size={18} />Voltar para usuários</Button>
        <Button onClick={loadUser}>Tentar novamente</Button>
      </div>
    </MessageCard>;
  }

  if (notFound || !user) {
    return <EmptyState
      title="Usuário não encontrado"
      message="O usuário solicitado não existe ou não está mais disponível."
      action={<Button as={Link} to="/admin/usuarios"><ArrowLeft size={18} />Voltar para usuários</Button>}
    />;
  }

  const orders = Array.isArray(user.pedidos)
    ? user.pedidos.filter((order) => order && typeof order === "object")
    : [];
  const isAdmin = user.roles === "ADMIN";

  return <>
    <PageHead>
      <div>
        <h2>Detalhes do usuário</h2>
        <p>Informações da conta e pedidos associados.</p>
      </div>
      <Button $secondary as={Link} to="/admin/usuarios"><ArrowLeft size={18} />Voltar para usuários</Button>
    </PageHead>

    <Details>
      <div className="row"><UserRound /><div><small>Nome</small><strong>{user.nome || "Não informado"}</strong></div></div>
      <div className="row"><Mail /><div><small>E-mail</small><strong>{user.email || "Não informado"}</strong></div></div>
      <div className="row"><Phone /><div><small>Telefone</small><strong>{user.telefone || "Não informado"}</strong></div></div>
      <div className="row"><ShieldCheck /><div><small>Perfil</small><Badge $tone={isAdmin ? "info" : "success"}>{isAdmin ? "Administrador" : "Cliente"}</Badge></div></div>

      <div className="orders">
        <h3>Pedidos ({orders.length})</h3>
        {orders.length === 0
          ? <p>Este usuário ainda não possui pedidos.</p>
          : orders.map((order, index) => {
              const status = typeof order.status === "string" ? order.status.replaceAll("_", " ") : "Status não informado";
              return <Link className="order" key={order.id || index} to={`/admin/pedidos/${order.id}`}>
                <span className="id">#{order.id || "Não informado"}</span>
                <Badge>{status}</Badge>
              </Link>;
            })}
      </div>
    </Details>
  </>;
}
