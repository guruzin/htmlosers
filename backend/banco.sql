
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS planilha_gastos;

-- Seleciona o banco
USE planilha_gastos;

-- =========================================
-- TABELA DE GASTOS (SAÍDAS)
-- =========================================

CREATE TABLE IF NOT EXISTS gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    metodo_pagamento ENUM('Dinheiro', 'Débito', 'Crédito') NOT NULL,
    data_compra DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABELA DE GANHOS (ENTRADAS)
-- =========================================

CREATE TABLE IF NOT EXISTS ganhos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
