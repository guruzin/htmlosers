
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/config/conexao.php";

$id = $_POST["id"] ?? "";

if (!filter_var($id, FILTER_VALIDATE_INT)) {
    http_response_code(400);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "ID inválido."
    ]);
    exit;
}

try {

    $sql = "DELETE FROM gastos WHERE id = ?";

    $comando = $conexao->prepare($sql);
    $comando->bind_param("i", $id);
    $comando->execute();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Gasto apagado com sucesso!"
    ]);

} catch (mysqli_sql_exception $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao apagar gasto."
    ]);
}

?>
