CREATE TABLE tbl_usuario (
    id_usuario BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL DEFAULT 'usuario',
    status VARCHAR(20) NOT NULL DEFAULT 'ativo',

    CONSTRAINT ck_usuario_perfil
        CHECK (perfil IN ('admin', 'gestor', 'usuario')),

    CONSTRAINT ck_usuario_status
        CHECK (status IN ('ativo', 'inativo', 'bloqueado'))
);

CREATE UNIQUE INDEX uq_usuario_email_lower
ON tbl_usuario (LOWER(email));