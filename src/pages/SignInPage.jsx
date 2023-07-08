import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import api from "../api";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", { email, senha });

      const { token } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);
      // Redirecionar o usuário para a rota "/home"
      navigate("/home");
      console.log("Login feito com sucesso!");
      console.log(token);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
        console.log(error.response.data.error); // Imprime o erro no console
      } else {
        setError("Erro ao fazer login.");
        console.log("Erro ao fazer login:", error); // Imprime o erro no console
      }
    }
  };

  return (
    <SignInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          data-test="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          data-test="password"
          type="password"
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SignInContainer>
  );
}

const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;
