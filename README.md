# Nexis AI

Plataforma de apoio à gestão de desempenho organizacional. O recorte planejado para o trabalho de infraestrutura reúne autenticação, colaboradores, metas/resultados e dashboard.

## Estado desta etapa

O frontend compila e possui fluxo integrado de cadastro e login. A API persiste usuários no PostgreSQL, gera hashes bcrypt, valida credenciais e devolve um token assinado. A tela autenticada confirma os dados persistidos. O recorte de colaboradores, metas/resultados e dashboard de indicadores continua como próximo marco funcional.

## Backend no Windows / PowerShell

Execute na raiz do repositório, com Python 3.10 ou superior instalado:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Edite o arquivo `.env` criado e configure `databaseUrl` com seu usuário, senha, host, porta e banco PostgreSQL. Configure também `authSecret` com um valor aleatório de pelo menos 32 caracteres. Se a senha do banco tiver caracteres reservados de URL, codifique-os; por exemplo, `@` vira `%40`. Variáveis já definidas no ambiente têm prioridade sobre o `.env`.

Crie o banco de desenvolvimento `nexis_db` com um usuário autorizado a criar o esquema inicial e execute, uma única vez, `db/sql/create_table_usuario.sql` nesse banco. O arquivo atual não é uma migração idempotente: não o reaplique em uma base que já contenha a tabela. Na implantação, os privilégios de preparação do esquema e de execução da aplicação serão separados.

Inicie a API na raiz:

```powershell
.\.venv\Scripts\python.exe -m uvicorn backend.mainFastAPI:app --reload --host 127.0.0.1 --port 8001
```

Confira `http://127.0.0.1:8001/api/health` e a documentação em `http://127.0.0.1:8001/docs`. A rota de saúde verifica o processo HTTP, sem validar a conexão com PostgreSQL. O cadastro disponível é `POST /api/auth/register` e exige a tabela criada:

```json
{
  "nome": "Gestor de demonstracao",
  "email": "gestor@example.com",
  "senha": "senhaFicticia123"
}
```

Esses dados são fictícios. Nunca reutilize credenciais pessoais em demonstrações.

O login é `POST /api/auth/login`:

```json
{
  "email": "gestor@example.com",
  "senha": "senhaFicticia123"
}
```

E-mails duplicados retornam HTTP 409; credenciais inválidas retornam HTTP 401. Respostas de erro não incluem detalhes internos nem hashes de senha.
O frontend conserva o token da sessão e confirma sua validade em `GET /api/auth/me`; futuras rotas privadas devem reutilizar essa validação no backend.

## Backend no Linux

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
test -f .env || cp .env.example .env
# Preencher .env e preparar o banco antes de cadastrar usuários.
.venv/bin/python -m uvicorn backend.mainFastAPI:app --reload --host 127.0.0.1 --port 8001
```

## Frontend

Use uma versão Node compatível com os campos `engines` das dependências fixadas em `frontend/package-lock.json`.

```bash
cd frontend
npm ci
npm run dev
```

Para verificar o build de produção:

```bash
npm run build
npm run lint
```

O resultado é gerado em `frontend/dist`. Durante o desenvolvimento, o Vite encaminha `/api` para `http://127.0.0.1:8001`. Em produção, o Nginx deverá servir `frontend/dist` e encaminhar `/api/` para o Uvicorn. Login social e por telefone aparecem desabilitados porque ainda não têm implementação real.

## Verificações de configuração

Na raiz do projeto:

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -p "test*.py" -v
```

Por padrão, os testes validam configuração, hash de senha, token e regras do login sem alterar o banco. O teste de integração com PostgreSQL é ignorado até ser habilitado explicitamente.

Para executar o teste de integração controlado com o PostgreSQL configurado, defina `RUN_DATABASE_TESTS=1` e um `authSecret` apenas no ambiente do processo. O teste cria um usuário fictício único, valida cadastro duplicado e login, e remove o registro ao final.

## Próximos marcos

1. Implementar o recorte de colaboradores, metas/resultados e dashboard com dados persistidos.
2. Proteger as futuras rotas privadas validando o token no backend.
3. Implantar na EC2 com Nginx e systemd, sem `--reload`.
4. Executar testes de operação, incidente, backup e restauração do trabalho.
