import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleConfirmarSenhaChange = (event) => {
    setConfirmarSenha(event.target.value);
  };

  const handleCadastroSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, {
        nome,
        email,
        senha,
        confirmarSenha,
      });

      // Redirecionar o usuário para a página de login
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Este email já está sendo utilizado.");
      } else {
        console.error("Erro ao cadastrar usuário:", error);
        alert(
          "Erro ao cadastrar usuário. Verifique os campos e tente novamente."
        );
      }
    }
  };

  return (
    <SignUpContainer>
      <form onSubmit={handleCadastroSubmit}>
        <input
          placeholder="Nome"
          data-test="name"
          type="text"
          value={nome}
          onChange={handleNomeChange}
        />
        <input
          placeholder="E-mail"
          type="email"
          data-test="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Senha"
          data-test="password"
          type="password"
          autoComplete="new-password"
          value={senha}
          onChange={handleSenhaChange}
        />
        <input
          placeholder="Confirme a senha"
          data-test="conf-password"
          type="password"
          autoComplete="new-password"
          value={confirmarSenha}
          onChange={handleConfirmarSenhaChange}
        />
        <button data-test="sign-up-submit" type="submit">
          Cadastrar
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
