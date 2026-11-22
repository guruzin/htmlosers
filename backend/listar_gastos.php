<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/config/conexao.php";

$sql = "SELECT * FROM gastos ORDER BY data_compra DESC";

$resultado = $conexao->query($sql);

if (!$resultado) {
    echo json_encode([
        "erro" => $conexao->error
    ]);
    exit;
}

$gastos = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($gastos);

?>