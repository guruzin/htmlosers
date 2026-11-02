
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config/conexao.php";

try {

    $sql = "SELECT id, descricao, metodo_pagamento, data_compra, valor
            FROM gastos
            ORDER BY data_compra DESC";

    $comando = $conexao->query($sql);

    $gastos = $comando->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($gastos);

} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar gastos."
    ]);
}
