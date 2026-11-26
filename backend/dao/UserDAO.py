from db.config import getConn, putConn
from pg8000.dbapi import DatabaseError

from backend.exceptions import UserAlreadyExistsError

class UserDAO:

    @staticmethod
    def setNewUser(nome, email, senhaHash):
        conn = getConn()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO tbl_usuario (nome, email, senha_hash) VALUES (%s, %s, %s) " \
                "RETURNING id_usuario, nome, email, perfil, status",
                (nome, email, senhaHash)
            )
            row = cursor.fetchone()

            usuario = {
                "idUsuario": row[0],
                "nome": row[1],
                "email": row[2],
                "perfil": row[3],
                "status": row[4],
            }

            conn.commit()
            return usuario

        except DatabaseError as error:
            conn.rollback()
            databaseDetails = error.args[0] if error.args else {}
            sqlState = databaseDetails.get("C") if isinstance(databaseDetails, dict) else None
            if sqlState == "23505":
                raise UserAlreadyExistsError from error
            raise
        finally:
            cursor.close()
            putConn(conn)

    @staticmethod
    def getUserByEmail(email):
        conn = getConn()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT id_usuario, nome, email, senha_hash, perfil, status "
                "FROM tbl_usuario WHERE LOWER(email) = LOWER(%s)",
                (email,),
            )
            row = cursor.fetchone()
            if row is None:
                return None

            return {
                "idUsuario": row[0],
                "nome": row[1],
                "email": row[2],
                "senhaHash": row[3],
                "perfil": row[4],
                "status": row[5],
            }
        finally:
            cursor.close()
            putConn(conn)

    @staticmethod
    def getPublicUserById(userId):
        conn = getConn()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT id_usuario, nome, email, perfil, status "
                "FROM tbl_usuario WHERE id_usuario = %s",
                (userId,),
            )
            row = cursor.fetchone()
            if row is None:
                return None

            return {
                "idUsuario": row[0],
                "nome": row[1],
                "email": row[2],
                "perfil": row[3],
                "status": row[4],
            }
        finally:
            cursor.close()
            putConn(conn)
