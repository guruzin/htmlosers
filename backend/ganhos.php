
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config/conexao.php";

$item = trim($_POST["item"] ?? "");
$data = $_POST["data"] ?? "";
$valor = $_POST["valor"] ?? "";

if (
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

    $sql = "INSERT INTO ganhos
            (item, data, valor)
            VALUES (:item, :data, :valor)";

    $comando = $conexao->prepare($sql);

    $comando->execute([
        ":item" => $item,
        ":data" => $data,
        ":valor" => $valor
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Entrada cadastrada com sucesso!",
        "id" => $conexao->lastInsertId()
    ]);

} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível salvar a entrada."
    ]);
}

?>