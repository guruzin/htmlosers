<?php
// Lê todos os registros da tabela gastos com SELECT e devolve em JSON.

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/config/conexao.php";

try {
    $comando = $conexao->prepare("SELECT * FROM gastos ORDER BY data_compra DESC, id DESC");
    $comando->execute();

    echo json_encode($comando->fetchAll());
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível listar os registros."
    ]);
}
