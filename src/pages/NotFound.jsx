import { Link } from "react-router-dom";
import { Button, Container } from "../components/UI";
export default function NotFound(){return <Container style={{minHeight:"60vh",display:"grid",placeContent:"center",textAlign:"center"}}><h1 style={{fontSize:"5rem",margin:0}}>404</h1><h2>Página não encontrada</h2><p>O endereço acessado não existe.</p><Button as={Link} to="/">Voltar ao início</Button></Container>}
