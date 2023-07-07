import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function TransactionsPage() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const location = useLocation();

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleEntradaSubmit = (event) => {
    event.preventDefault();
    // Lógica para adicionar a transação de entrada
  };

  const handleSaidaSubmit = (event) => {
    event.preventDefault();
    // Lógica para adicionar a transação de saída
  };

  return (
    <TransactionsContainer>
      <h1>Nova Transação</h1>
      {location.pathname === "/nova-transacao/entrada" && (
        <form onSubmit={handleEntradaSubmit}>
          <input
            data-test="registry-amount-input"
            placeholder="Valor"
            type="text"
            value={valor}
            onChange={handleValorChange}
          />
          <input
            data-test="registry-name-input"
            placeholder="Descrição"
            type="text"
            value={descricao}
            onChange={handleDescricaoChange}
          />
          <button data-test="registry-save" type="submit">
            Salvar Transação de Entrada
          </button>
        </form>
      )}
      {location.pathname === "/nova-transacao/saida" && (
        <form onSubmit={handleSaidaSubmit}>
          <input
            data-test="registry-amount-input"
            placeholder="Valor"
            type="text"
            value={valor}
            onChange={handleValorChange}
          />
          <input
            data-test="registry-name-input"
            placeholder="Descrição"
            type="text"
            value={descricao}
            onChange={handleDescricaoChange}
          />
          <button data-test="registry-save" type="submit">
            Salvar Transação de Saída
          </button>
        </form>
      )}
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
