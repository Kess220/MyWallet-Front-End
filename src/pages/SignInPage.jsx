import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/", {
        email,
        senha,
      });

      const { token, redirect } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);

      // Redirecionar o usuário para a rota especificada pelo back-end
      window.location.href = redirect;
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("Erro ao fazer login.");
      }
    }
  };

  return (
    <SignInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
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
