import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Verificar se o usuário já está autenticado ao carregar a página
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setNome(decodedToken.email); // Define o nome do usuário logado
        navigate("/home");
      } else {
        navigate("/"); // Redireciona para a página de login se o token for inválido ou expirado
      }
    }
  }, [navigate]);

  const decodeToken = (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };

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
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuario/cadastro`,
        {
          nome,
          email,
          senha,
          confirmarSenha,
        }
      );

      const token = response.data.token; // Obter o token retornado pela API

      // Armazenar o token no LocalStorage
      localStorage.setItem("token", token);

      // Configurar o cabeçalho com o token
      setAuthHeader(token);

      // Redirecionar o usuário para a página de home
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response.data.error);
      setError(
        "Erro ao cadastrar usuário. Verifique os campos e tente novamente."
      );
    }
  };

  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const Link = styled.a`
  color: blue;
  margin-top: 10px;
`;
