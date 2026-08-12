import {useState} from "react";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {ArrowRight, Eye, EyeOff, Leaf} from "lucide-react";
import styled from "styled-components";
import {Button, Input} from "../components/UI";
import {useAuth} from "../contexts/AuthContext";
import {useToast} from "../contexts/ToastContext";
import {getErrorMessage} from "../utils/format";

const Page = styled.div`min-height: 100vh;
    background: #eef3ed;
    display: grid;
    grid-template-columns:1.05fr .95fr;
    @media (max-width: 800px) {
        grid-template-columns:1fr
    }`;
const Visual = styled.div`background: linear-gradient(145deg, rgba(20, 59, 39, .92), rgba(31, 94, 60, .83)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80') center/cover;
    color: white;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1 {
        font-size: clamp(2.4rem, 5vw, 4.7rem);
        line-height: 1;
        letter-spacing: -.06em;
        max-width: 650px;
        margin-bottom: 20px
    }

    p {
        font-size: 1.1rem;
        max-width: 520px;
        color: #d5e3d9;
        line-height: 1.7
    }

    @media (max-width: 800px) {
        display: none
    }`;
const Logo = styled(Link)`font: 800 1.55rem Manrope;`;
const FormSide = styled.div`display: grid;
    place-items: center;
    padding: 48px 24px;`;
const Form = styled.form`width: min(440px, 100%);
    background: white;
    padding: 42px;
    border-radius: 22px;
    border: 1px solid #e1e7e1;
    box-shadow: 0 20px 60px rgba(35, 69, 46, .08);

    h2 {
        font-size: 2rem;
        letter-spacing: -.04em;
        margin-bottom: 8px
    }

    p {
        color: #6b776f
    }

    .fields {
        display: grid;
        gap: 16px;
        margin: 28px 0 22px
    }

    .field label {
        display: block;
        font-weight: 600;
        font-size: .87rem;
        margin-bottom: 7px
    }

    .password {
        position: relative
    }

    .password button {
        position: absolute;
        right: 8px;
        top: 7px;
        border: 0;
        background: transparent;
        padding: 7px;
        cursor: pointer
    }

    .error {
        color: #b52e2e;
        background: #fff0f0;
        padding: 10px 12px;
        border-radius: 9px;
        font-size: .88rem
    }

    a {
        color: #1d6540;
        font-weight: 700
    }

    ${Button} {
        width: 100%;
    }`;

function AuthShell({children}) {
    return <Page><Visual><Logo to="/">nexo.</Logo>
        <div><Leaf size={38}/><h1>Escolhas boas, perto de você.</h1><p>Descubra produtos para transformar pequenos
            momentos da sua rotina.</p></div>
        <small>Compre com praticidade e acompanhe cada pedido.</small></Visual><FormSide>{children}</FormSide></Page>
}

export function LoginPage() {
    const {signIn, isAuthenticated} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({email: "", senha: ""});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    if (isAuthenticated) return <Navigate to="/" replace/>;
    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signIn(form);
            showToast("Login realizado com sucesso!");
            navigate(location.state?.from || "/", {replace: true})
        } catch (err) {
            setError(getErrorMessage(err, "E-mail ou senha inválidos."))
        } finally {
            setLoading(false)
        }
    };
    return <AuthShell><Form onSubmit={submit}><h2>Boas-vindas</h2><p>Entre para acompanhar seus pedidos.</p>
        <div className="fields">
            <div className="field"><label>E-mail</label><Input type="email" required value={form.email}
                                                               onChange={e => setForm({...form, email: e.target.value})}
                                                               placeholder="voce@email.com"/></div>
            <div className="field"><label>Senha</label>
                <div className="password"><Input type={show ? "text" : "password"} required value={form.senha}
                                                 onChange={e => setForm({...form, senha: e.target.value})}
                                                 placeholder="Sua senha"/>
                    <button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18}/> :
                        <Eye size={18}/>}</button>
                </div>
            </div>
        </div>
        {error && <p className="error">{error}</p>}<Button
            disabled={loading}>{loading ? "Entrando..." : <>Entrar <ArrowRight size={18}/></>}</Button><p
            style={{textAlign: "center", marginTop: 22}}>Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p></Form></AuthShell>
}

export function RegisterPage() {
    const {signUp, isAuthenticated} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();
    const [form, setForm] = useState({nome: "", email: "", telefone: "", senha: ""});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    if (isAuthenticated) return <Navigate to="/" replace/>;
    const change = e => setForm({...form, [e.target.name]: e.target.value});
    const submit = async (e) => {
        e.preventDefault();
        setError("");
        if (form.senha.length < 6) {
            setError("A senha deve ter entre 6 e 20 caracteres.");
            return
        }
        setLoading(true);
        try {
            await signUp(form);
            showToast("Conta criada! Agora faça seu login.");
            navigate("/login")
        } catch (err) {
            setError(getErrorMessage(err, "Não foi possível criar a conta."))
        } finally {
            setLoading(false)
        }
    };
    return <AuthShell><Form onSubmit={submit}><h2>Crie sua conta</h2><p>Leva menos de um minuto.</p>
        <div className="fields">
            <div className="field"><label>Nome completo</label><Input name="nome" required value={form.nome}
                                                                      onChange={change}/></div>
            <div className="field"><label>E-mail</label><Input name="email" type="email" required value={form.email}
                                                               onChange={change}/></div>
            <div className="field"><label>Telefone</label><Input name="telefone" required value={form.telefone}
                                                                 onChange={change}/></div>
            <div className="field"><label>Senha</label><Input name="senha" type="password" minLength="6" maxLength="20"
                                                              required value={form.senha} onChange={change}/></div>
        </div>
        {error && <p className="error">{error}</p>}<Button
            disabled={loading}>{loading ? "Criando conta..." : "Criar minha conta"}</Button><p
            style={{textAlign: "center", marginTop: 22}}>Já tem uma conta? <Link to="/login">Entrar</Link></p>
    </Form></AuthShell>
}
