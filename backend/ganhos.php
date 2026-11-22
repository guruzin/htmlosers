
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/config/conexao.php";

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

    // Prepara o comando SQL
    $sql = "INSERT INTO ganhos (item, data, valor)
            VALUES (?, ?, ?)";

    $comando = $conexao->prepare($sql);

    // Vincula os valores (string, string, decimal)
    $comando->bind_param("ssd", $item, $data, $valor);

    // Executa o cadastro
    $comando->execute();

    // Retorna sucesso em JSON
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Entrada cadastrada com sucesso!",
        "id" => $conexao->insert_id
    ]);

} catch (mysqli_sql_exception $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível salvar a entrada.",
        "erro" => $erro->getMessage()
    ]);
}

?>
