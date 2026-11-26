-- Finanças em Dia — cria o banco e todas as tabelas do projeto.
-- Importe este arquivo no phpMyAdmin (aba "Importar") antes de abrir o site.

-- Garante que os acentos (ex.: 'Débito', 'Crédito') sejam lidos corretamente
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS planilha_gastos
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE planilha_gastos;

-- Gastos (saídas)
CREATE TABLE IF NOT EXISTS gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    metodo_pagamento ENUM('Dinheiro', 'Débito', 'Crédito') NOT NULL,
    data_compra DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ganhos (entradas)
CREATE TABLE IF NOT EXISTS ganhos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
