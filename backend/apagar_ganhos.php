<?php
// Apaga um registro da tabela ganhos com DELETE.

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/config/conexao.php";

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
    $comando = $conexao->prepare("DELETE FROM ganhos WHERE id = ?");
    $comando->execute([$id]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Entrada apagada com sucesso!"
    ]);
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível apagar o registro."
    ]);
}
