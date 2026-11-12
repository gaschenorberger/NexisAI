from urllib.parse import urlsplit
from pg8000.dbapi import connect

databaseUrl = "postgresql://postgres:123@localhost:5432/nexis_db"
database = urlsplit(databaseUrl)

def getConn():
    return connect(
        user=database.username,
        password=database.password,
        host=database.hostname,
        port=database.port,
        database=database.path.lstrip('/'),
    )

def putConn(conn):
    conn.close()
