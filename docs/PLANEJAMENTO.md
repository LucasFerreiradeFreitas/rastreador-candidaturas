# Rastreador de Candidaturas: Planejamento

## Problema

Quem busca emprego se candidata a muitas vagas e perde o controle de
em que etapa cada processo está.

## Solução

Um quadro Kanban onde cada pessoa cadastra suas candidaturas e move os
cartões entre as etapas do processo seletivo.

## Usuário-alvo

Pessoas em busca de emprego (e recrutadores avaliando o portfólio via
conta de demonstração).

## Requisitos funcionais (MVP)

RF01 Cadastro, login (e-mail/senha e Google), logout, recuperar senha
RF02 Rota protegida: sem login, redireciona para /login
RF03 CRUD de vagas
RF04 Colunas: Interessado, Candidatado, Entrevista, Teste técnico,
Oferta, Encerrada
RF05 Arrastar e soltar entre colunas e reordenar, com persistência
RF06 Busca por empresa/cargo e filtro por etapa
RF07 Painel de resumo (total e por etapa)
RF08 Estados de carregando, erro e vazio
RF09 Responsivo e acessível (teclado, contraste, labels)
RF10 Conta de demonstração com dados de exemplo

## Requisitos não funcionais

- Somente serviços gratuitos (plano Spark, sem cartão)
- Site leve (sem vídeos, imagens otimizadas)
- Cada usuário acessa apenas os próprios dados
- Interface em português do Brasil

## Fora do escopo (só depois do MVP)

Follow-up com alerta de atraso, tema escuro, exportar CSV, histórico
de anotações.

## Telas

1. /login E-mail, senha, botão Google, link "Esqueci a senha"
2. /cadastro Nome opcional, e-mail, senha, confirmação
3. /recuperar-senha E-mail para envio do link de redefinição
4. /quadro (protegida) cabeçalho com logout, painel de resumo,
   busca e filtro, 6 colunas com cartões
5. Modal de vaga Criar/editar (empresa, cargo, link, etapa, data,
   notas)
6. Confirmação Excluir vaga
7. 404 Página não encontrada

## Fluxo principal

Visitante -> /cadastro -> /quadro (vazio) -> "Nova vaga" -> cartão em
"Interessado" -> arrasta até "Candidatado" -> (recarrega a página) ->
cartão continua na coluna.

## Modelo de dados (Firestore)

users/{uid}/applications/{applicationId}
company string (obrigatório)
role string (obrigatório)
link string (opcional)
status string "interested" | "applied" | "interview" |
"technical_test" | "offer" | "closed"
order number posição dentro da coluna
appliedAt timestamp | null
notes string
createdAt timestamp (serverTimestamp)
updatedAt timestamp (serverTimestamp)

## Decisões de arquitetura

(ver conversa: React+Vite, Firebase Auth/Firestore/Hosting, React
Router, dnd-kit, Context, Security Rules)
