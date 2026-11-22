
<?php

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "planilha_gastos";

// 1. Conecta ao MySQL sem selecionar um banco
$conn = new mysqli($host, $usuario, $senha);

if ($conn->connect_error) {
    die("Erro ao conectar ao MySQL: " . $conn->connect_error);
}

// 2. Cria o banco caso não exista
$sqlBanco = "CREATE DATABASE IF NOT EXISTS planilha_gastos";

if (!$conn->query($sqlBanco)) {
    die("Erro ao criar banco: " . $conn->error);
}

// 3. Seleciona o banco criado
if (!$conn->select_db($banco)) {
    die("Erro ao selecionar banco: " . $conn->error);
}

// 4. Configura UTF-8
$conn->set_charset("utf8mb4");

// 5. Cria tabela de gastos (saídas)
$sqlGastos = "
CREATE TABLE IF NOT EXISTS gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    metodo_pagamento ENUM('Dinheiro', 'Débito', 'Crédito') NOT NULL,
    data_compra DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($sqlGastos)) {
    die("Erro ao criar tabela gastos: " . $conn->error);
}

// 6. Cria tabela de ganhos (entradas)
$sqlGanhos = "
CREATE TABLE IF NOT EXISTS ganhos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($sqlGanhos)) {
    die("Erro ao criar tabela ganhos: " . $conn->error);
}


$conexao = $conn;

?>
