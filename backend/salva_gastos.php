<?php
// Recebe o formulário "Novo gasto" e grava na tabela gastos com INSERT.

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/config/conexao.php";

$descricao = trim($_POST["descricao"] ?? "");
$metodo = $_POST["metodo_pagamento"] ?? "";
$data = $_POST["data"] ?? "";
$valor = $_POST["valor"] ?? "";

$metodosPermitidos = ["Dinheiro", "Débito", "Crédito"];

// Confere de novo no servidor (o JavaScript pode ser desligado)
if (
    mb_strlen($descricao) < 3 ||
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
    $sql = "INSERT INTO gastos (descricao, metodo_pagamento, data_compra, valor)
            VALUES (?, ?, ?, ?)";

    $comando = $conexao->prepare($sql);
    $comando->execute([$descricao, $metodo, $data, $valor]);

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
