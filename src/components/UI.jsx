import styled from "styled-components";
import { LoaderCircle, PackageOpen, RefreshCw } from "lucide-react";

export const Container = styled.div`width: min(1180px, calc(100% - 48px)); margin: 0 auto; @media(max-width: 650px){ width: min(100% - 28px, 1180px); }`;
export const Section = styled.section`padding: ${({ $compact }) => $compact ? "42px 0" : "68px 0"};`;
export const SectionHeader = styled.div`
  display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 28px;
  h2 { font-size: clamp(1.65rem, 3vw, 2.25rem); margin: 0; letter-spacing: -.04em; }
  p { color: #667168; margin: 7px 0 0; }
`;
export const Button = styled.button`
  border: 0; border-radius: 12px; padding: 12px 18px; cursor: pointer; font-weight: 700; display: inline-flex; align-items: center;
  justify-content: center; gap: 9px; line-height: 1.2; text-decoration: none; transition: .2s ease; background: ${({ $secondary, $danger }) => $danger ? "#fff0f0" : $secondary ? "#edf0eb" : "#1d5c3a"};
  color: ${({ $secondary, $danger }) => $danger ? "#b52e2e" : $secondary ? "#213128" : "white"};
  &:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(.96); }
  &:disabled { opacity: .55; cursor: not-allowed; }
`;
export const Input = styled.input`
  width: 100%; padding: 13px 14px; border-radius: 11px; border: 1px solid #d7ded8; background: #fff; outline: none;
  &:focus { border-color: #34865b; box-shadow: 0 0 0 3px rgba(52,134,91,.12); }
`;
export const Select = styled.select`
  padding: 12px 38px 12px 13px; border: 1px solid #d7ded8; border-radius: 11px; color: #26352c; background: white; outline: none;
`;
export const Card = styled.div`background: #fff; border: 1px solid #e4e8e3; border-radius: 18px; box-shadow: 0 5px 22px rgba(35,57,42,.05);`;

const Center = styled.div`min-height: ${({ $small }) => $small ? "220px" : "55vh"}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #667168; gap: 12px; svg { flex: 0 0 auto; } h3 { margin-bottom: 8px; } p { margin-bottom: 0; }`;
const Spin = styled(LoaderCircle)`animation: spin .8s linear infinite; @keyframes spin { to { transform: rotate(360deg); } }`;
export function Loading({ text = "Carregando...", small = false }) { return <Center $small={small}><Spin size={32}/><span>{text}</span></Center>; }
export function EmptyState({ title = "Nada por aqui", message, action }) { return <Center $small><PackageOpen size={42}/><div><h3>{title}</h3><p>{message}</p></div>{action}</Center>; }
export function ErrorState({ message, onRetry }) { return <Center $small><h3>Algo não saiu como esperado</h3><p>{message}</p>{onRetry && <Button onClick={onRetry}><RefreshCw size={18}/>Tentar novamente</Button>}</Center>; }

const SkeletonBox = styled.div`height: ${({ $height }) => $height || "320px"}; border-radius: 18px; background: linear-gradient(90deg,#edf0ec 25%,#f7f8f6 40%,#edf0ec 65%); background-size: 400% 100%; animation: shimmer 1.4s infinite; @keyframes shimmer { to { background-position: -100% 0; } }`;
export function SkeletonGrid({ count = 8 }) { return <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>{Array.from({length:count},(_,i)=><SkeletonBox key={i}/>)}</div>; }
