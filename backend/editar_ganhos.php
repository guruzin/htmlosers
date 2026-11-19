<?php

header("Content-Type: application/json; charset=UTF-8");
require_once "config/conexao.php";

$id = $_POST["id"] ?? "";
$item = trim($_POST["item"] ?? "");
$data = $_POST["data"] ?? "";
$valor = $_POST["valor"] ?? "";

if (
    !filter_var($id, FILTER_VALIDATE_INT) ||
    $item === "" ||
    $data === "" ||
    !is_numeric($valor) ||
    (float)$valor <= 0
) {
    http_response_code(400);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Preencha todos os campos corretamente."
    ]);
    exit;
}

try {
    $sql = "UPDATE ganhos
            SET item = :item,
                data = :data,
                valor = :valor
            WHERE id = :id";

    $comando = $conexao->prepare($sql);

    $comando->execute([
        ":item" => $item,
        ":data" => $data,
        ":valor" => $valor,
        ":id" => $id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Entrada atualizada com sucesso!"
    ]);

} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao atualizar entrada."
    ]);
}