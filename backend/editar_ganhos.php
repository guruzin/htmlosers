<?php
// Atualiza uma entrada existente com UPDATE.

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/config/conexao.php";

$id = $_POST["id"] ?? "";
$item = trim($_POST["item"] ?? "");
$data = $_POST["data"] ?? "";
$valor = $_POST["valor"] ?? "";

if (
    !filter_var($id, FILTER_VALIDATE_INT) ||
    mb_strlen($item) < 3 ||
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
    $sql = "UPDATE ganhos SET item = ?, data = ?, valor = ? WHERE id = ?";

    $comando = $conexao->prepare($sql);
    $comando->execute([$item, $data, $valor, $id]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Entrada atualizada com sucesso!"
    ]);
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível atualizar a entrada."
    ]);
}
