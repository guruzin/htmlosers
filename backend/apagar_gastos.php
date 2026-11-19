<?php

header("Content-Type: application/json; charset=UTF-8");
require_once "config/conexao.php";

$id = $_POST["id"] ?? "";

if (!filter_var($id, FILTER_VALIDATE_INT)) {
    http_response_code(400);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "ID inválido."
    ]);
    exit;
}

try {
    $sql = "DELETE FROM gastos WHERE id = :id";
    $comando = $conexao->prepare($sql);
    $comando->execute([":id" => $id]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Gasto apagado com sucesso!"
    ]);

} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao apagar gasto."
    ]);
}