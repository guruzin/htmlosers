
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config/conexao.php";
ini_set("display_errors", 1);
error_reporting(E_ALL);

try {

    $sql = "SELECT id, item, data, valor
            FROM ganhos
            ORDER BY data DESC";

    $comando = $conexao->query($sql);

    $entradas = $comando->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($entradas);

} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar entradas."
    ]);
}
