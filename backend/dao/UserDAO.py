from db.config import getConn, putConn

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
                "id_usuario": row[0],
                "nome": row[1],
                "email": row[2],
                "perfil": row[3],
                "status": row[4],
            }

            conn.commit()
            return usuario
        
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            putConn(conn)