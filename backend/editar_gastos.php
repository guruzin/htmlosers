<?php

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/config/conexao.php";

$id = $_POST["id"] ?? "";
$descricao = trim($_POST["descricao"] ?? "");
$metodo = $_POST["metodo_pagamento"] ?? "";
$data = $_POST["data"] ?? "";
$valor = $_POST["valor"] ?? "";

$metodosPermitidos = ["Dinheiro", "Débito", "Crédito"];

if (
    !filter_var($id, FILTER_VALIDATE_INT) ||
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
    $sql = "UPDATE gastos
            SET descricao = ?,
                metodo_pagamento = ?,
                data_compra = ?,
                valor = ?
            WHERE id = ?";

    $comando = $conexao->prepare($sql);

    $comando->bind_param(
        "sssdi",
        $descricao,
        $metodo,
        $data,
        $valor,
        $id
    );

    $comando->execute();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Gasto atualizado com sucesso!"
    ]);

} catch (mysqli_sql_exception $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao atualizar gasto."
    ]);
}
?>