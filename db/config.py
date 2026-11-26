import os
from pathlib import Path
from urllib.parse import unquote, urlsplit

from dotenv import load_dotenv
from pg8000.dbapi import connect

projectPath = Path(__file__).resolve().parents[1]
load_dotenv(projectPath / ".env", override=False)

def getConn():
    databaseUrl = os.getenv("databaseUrl", "").strip()
    if not databaseUrl:
        raise ValueError("Configure databaseUrl no ambiente ou no arquivo .env da raiz.")

    try:
        database = urlsplit(databaseUrl)
        databasePort = database.port or 5432
        databaseHost = database.hostname
    except ValueError:
        raise ValueError("databaseUrl contém um endereço PostgreSQL inválido.") from None

    if (
        database.scheme not in ("postgresql", "postgres")
        or not databaseHost
        or not database.username
        or not database.path.lstrip("/")
    ):
        raise ValueError("databaseUrl deve informar protocolo PostgreSQL, usuário, host e banco.")

    return connect(
        user=unquote(database.username),
        password=unquote(database.password) if database.password is not None else None,
        host=databaseHost,
        port=databasePort,
        database=unquote(database.path.lstrip("/")),
    )

def putConn(conn):
    conn.close()
