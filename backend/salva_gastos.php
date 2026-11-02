<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config/conexao.php";

$descricao = trim($_POST["descricao"] ?? "");
$metodo = $_POST["metodo_pagamento"] ?? "";
$data = $_POST["data"] ?? "";
$valor = $_POST["valor"] ?? "";

$metodosPermitidos = ["Dinheiro", "Débito", "Crédito"];

if (
    $descricao === "" ||
    !in_array($metodo, $metodosPermitidos, true) ||
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

    $sql = "INSERT INTO gastos
            (descricao, metodo_pagamento, data_compra, valor)
            VALUES (:descricao, :metodo, :data, :valor)";

    $comando = $conexao->prepare($sql);

    $comando->execute([
        ":descricao" => $descricao,
        ":metodo" => $metodo,
        ":data" => $data,
        ":valor" => $valor
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Gasto cadastrado com sucesso!",
        "id" => $conexao->lastInsertId()
    ]);

} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível salvar o gasto."
    ]);
}
