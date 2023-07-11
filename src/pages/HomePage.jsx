import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/nome`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const { nome } = response.data;
        setUserName(nome);
      } catch (error) {
        console.error("Erro ao obter o nome do usuário:", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transacoes`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const transactionsData = response.data || [];
        setTransactions(transactionsData);

        let saldo = 0;
        transactionsData.forEach((transaction) => {
          if (transaction.tipo === "entrada") {
            saldo += parseFloat(
              transaction.valor.replace(/\./g, "").replace(",", ".")
            );
          } else if (transaction.tipo === "saida") {
            saldo -= parseFloat(
              transaction.valor.replace(/\./g, "").replace(",", ".")
            );
          }
        });

        const saldoFormatado = saldo.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        setBalance(saldoFormatado);
      } catch (error) {
        console.error("Erro ao obter as transações:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {userName} </h1>
        <BiExit data-test="logout" onClick={handleLogout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <ListItemContainer key={transaction._id}>
                <DateSpan>
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </DateSpan>
                <div>
                  <strong data-test="registry-name">
                    {transaction.descricao}
                  </strong>
                </div>
                <Value
                  data-test="registry-amount"
                  color={
                    transaction.tipo === "entrada" ? "positivo" : "negativo"
                  }
                >
                  {transaction.valor}
                </Value>
              </ListItemContainer>
            ))
          ) : (
            <p>Nenhuma transação encontrada.</p>
          )}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value
            color={balance >= 0 ? "positivo" : "negativo"}
            data-test="total-amount"
          >
            {balance
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              .replace(/\./g, "")}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <CustomLinkButton to="/nova-transacao/entrada">
          <button data-test="new-income">
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </button>
        </CustomLinkButton>
        <CustomLinkButton to="/nova-transacao/saida">
          <button data-test="new-expense">
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </button>
        </CustomLinkButton>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;

const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  article {
    display: flex;
    justify-content: space-between;

    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 80%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 18px;
    }
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;

  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;

const DateSpan = styled.span`
  color: #c6c6c6;
  margin-right: 10px;
`;

const CustomLinkButton = styled(Link)`
  text-decoration: none;
  width: 50%;
  height: 115px;
  font-size: 22px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 18px;
  }
`;
