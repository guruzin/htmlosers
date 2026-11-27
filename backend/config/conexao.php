
<?php

header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$banco = "planilha_gastos";
$usuario = "root";
$senha = "";

try {

    // 1. Conecta ao MySQL sem selecionar um banco específico
    $conexao = new PDO(
        "mysql:host=$host;charset=utf8mb4",
        $usuario,
        $senha,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    // 2. Cria o banco se ele ainda não existir
    $conexao->exec("
        CREATE DATABASE IF NOT EXISTS `$banco`
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci
    ");

    // 3. Seleciona o banco criado
    $conexao->exec("USE `$banco`");

    // 4. Cria a tabela gastos se não existir
    $conexao->exec("
        CREATE TABLE IF NOT EXISTS gastos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            descricao VARCHAR(100) NOT NULL,
            metodo_pagamento VARCHAR(30) NOT NULL,
            data_compra DATE NOT NULL,
            valor DECIMAL(10,2) NOT NULL
        )
    ");

    // 5. Cria a tabela ganhos se não existir
    $conexao->exec("
        CREATE TABLE IF NOT EXISTS ganhos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            descricao VARCHAR(100) NOT NULL,
            data_recebimento DATE NOT NULL,
            valor DECIMAL(10,2) NOT NULL
        )
    ");

} catch (PDOException $erro) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao conectar ou criar banco de dados.",
        "erro" => $erro->getMessage()
    ]);

    exit;
}

