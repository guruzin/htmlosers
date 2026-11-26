<?php
// Conexão com o banco usando PDO.
// O banco e as tabelas são criados pelo arquivo backend/sql/banco.sql.

$host = "localhost";
$banco = "planilha_gastos";
$usuario = "root";
$senha = "";

try {
    $conexao = new PDO(
        "mysql:host=$host;dbname=$banco;charset=utf8mb4",
        $usuario,
        $senha,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $erro) {
    http_response_code(500);
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível conectar ao banco. Importe o arquivo backend/sql/banco.sql no phpMyAdmin."
    ]);
    exit;
}
