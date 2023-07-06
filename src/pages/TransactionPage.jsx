import React, { useState } from "react";
import styled from "styled-components";

export default function TransactionsPage() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleEntradaSubmit = (event) => {
    event.preventDefault();

    // Fazer a requisição para adicionar a transação de entrada
    const token = localStorage.getItem("token"); // Obter o token armazenado no LocalStorage
    const transacao = {
      valor: parseFloat(valor),
      descricao,
    };

    fetch("/nova-transacao/entrada", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transacao),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Tratar a resposta do servidor conforme necessário
      })
      .catch((error) => {
        console.error("Erro ao adicionar transação de entrada:", error);
      });
  };

  const handleSaidaSubmit = (event) => {
    event.preventDefault();

    // Fazer a requisição para adicionar a transação de saída
    const token = localStorage.getItem("token"); // Obter o token armazenado no LocalStorage
    const transacao = {
      valor: parseFloat(valor),
      descricao,
    };

    fetch("/nova-transacao/saida", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transacao),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Tratar a resposta do servidor conforme necessário
      })
      .catch((error) => {
        console.error("Erro ao adicionar transação de saída:", error);
      });
  };

  return (
    <TransactionsContainer>
      <h1>Nova Transação</h1>
      <form onSubmit={handleEntradaSubmit}>
        <input
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={handleValorChange}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={handleDescricaoChange}
        />
        <button type="submit">Salvar Transação de Entrada</button>
      </form>
      <form onSubmit={handleSaidaSubmit}>
        <input
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={handleValorChange}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={handleDescricaoChange}
        />
        <button type="submit">Salvar Transação de Saída</button>
      </form>
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
