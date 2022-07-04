import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import UserInfoContext from "./../context/UserInfoContext";

export default function LoginScreen() {
  const [loginInfo, setLoginInfo] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  let loginReturnObject = localStorage.getItem("loginInfo");

  const URL = "https://projeto13-mywallet-ipt.herokuapp.com/sign-in";
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.token) {
      navigate("/wallet");
    }
  }, [userInfo, navigate]);

  function updateLoginInfo(event) {
    const { name, value } = event.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function loginInUser(event) {
    event.preventDefault();
    setDisabled(true);

    const promise = axios.post(URL, loginInfo);
    promise.then(({ data }) => {
      loginReturnObject = JSON.stringify(data);
      localStorage.setItem("loginInfo", loginReturnObject);
      setUserInfo(data);
      navigate("/wallet");
    });
    promise.catch((error) => {
      console.log(error.response.data);
      alert(error.response.data);
      setDisabled(false);
    });
  }

  return (
    <LoginContainer>
      <h1>MyWallet</h1>
      <StyledForm onSubmit={loginInUser}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          disabled={disabled}
          onChange={updateLoginInfo}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          disabled={disabled}
          onChange={updateLoginInfo}
          required
        />
        <button type="submit" disabled={disabled}>
          {disabled ? (
            <ThreeDots color="#fff" height={40} width={40} />
          ) : (
            "Entrar"
          )}
        </button>
      </StyledForm>
      <StyledLink to="/sign-up">
        <p>Primeira vez? Cadastre-se!</p>
      </StyledLink>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 159px;
  padding: 0px 25px;

  h1 {
    font-family: "Saira Stencil One", cursive;
    color: #fff;
    font-size: 32px;
    line-height: 50px;
    margin-bottom: 24px;
  }

  p {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    height: 58px;
    background-color: #fff;
    font-size: 20px;
    line-height: 23px;
    border: none;
    border-radius: 5px;
    margin-bottom: 13px;
    font-family: "Raleway", sans-serif;
    padding-left: 15px;
    &:disabled {
      background-color: #aaa;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    color: #fff;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    font-weight: bold;
    line-height: 23px;
    margin-bottom: 36px;
    &:disabled {
      opacity: 0.5;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
