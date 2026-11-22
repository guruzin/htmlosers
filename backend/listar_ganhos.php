<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/config/conexao.php";

$sql = "SELECT * FROM ganhos ORDER BY data DESC";

$resultado = $conexao->query($sql);

if (!$resultado) {
    echo json_encode([
        "erro" => $conexao->error
    ]);
    exit;
}

$ganhos = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($ganhos);

?>