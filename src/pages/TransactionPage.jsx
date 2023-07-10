import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TransactionsPage() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleEntradaSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Token de autenticação não encontrado no localStorage
        console.error("Token de autenticação não encontrado.");
        return;
      }

      const transacao = {
        valor: parseFloat(valor),
        descricao,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/nova-transacao/entrada`,
        transacao,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 201) {
        // Transação de entrada adicionada com sucesso
        console.log(data.mensagem);
        console.log(data.transacao);

        // Redirecionar para a rota "/home"
        navigate("/home");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Erro ao adicionar a transação de entrada:", error);
      alert(
        "Ocorreu um erro ao adicionar a transação de entrada. Por favor, verifique os dados e tente novamente."
      );
    }
  };

  const handleSaidaSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Token de autenticação não encontrado no localStorage
        console.error("Token de autenticação não encontrado.");
        return;
      }

      const transacao = {
        valor: parseFloat(valor),
        descricao,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/nova-transacao/saida`,
        transacao,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 201) {
        // Transação de saída adicionada com sucesso
        console.log(data.mensagem);
        console.log(data.transacao);

        navigate("/home");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Erro ao adicionar a transação de saída:", error);
      alert(
        "Ocorreu um erro ao adicionar a transação de saída. Por favor, verifique os dados e tente novamente."
      );
    }
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
