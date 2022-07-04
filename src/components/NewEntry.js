import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import UserInfoContext from "../context/UserInfoContext";

export default function NewEntry() {
  const [entryInfo, setEntryInfo] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { userInfo, entryType } = useContext(UserInfoContext);

  const ENTRY_URL = "https://projeto13-mywallet-ipt.herokuapp.com/entry";

  const navigate = useNavigate();

  function updateEntryInfo(event) {
    const { name, value } = event.target;
    setEntryInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function submitNewEntry(event) {
    event.preventDefault();
    setDisabled(true);

    const promise = axios.post(
      ENTRY_URL,
      { ...entryInfo, type: entryType },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    promise.then((response) => {
      navigate("/wallet");
    });
    promise.catch((error) => {
      alert(error.response.data);
      setDisabled(false);
    });
  }

  return (
    <NewEntryContainer>
      <h2>Nova {entryType === "credit" ? "entrada" : "saída"}</h2>
      <StyledForm onSubmit={submitNewEntry}>
        <input
          type="number"
          name="value"
          placeholder="Valor"
          step="0.01"
          disabled={disabled}
          onChange={updateEntryInfo}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          disabled={disabled}
          onChange={updateEntryInfo}
          required
        />
        <button type="submit" disabled={disabled}>
          {disabled ? (
            <ThreeDots color="#fff" height={40} width={40} />
          ) : (
            `Salvar ${entryType === "credit" ? "entrada" : "saída"}`
          )}
        </button>
      </StyledForm>
    </NewEntryContainer>
  );
}

const NewEntryContainer = styled.div`
  width: 100%;
  padding: 25px;

  h2 {
    font-size: 26px;
    line-height: 31px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 40px;
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
  }
`;
