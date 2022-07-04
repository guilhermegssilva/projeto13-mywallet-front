import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useContext } from "react";
import UserInfoContext from "../context/UserInfoContext";

export default function NewExit() {
  const location = useLocation();
  const [editInfo, setEditInfo] = useState(location.state);
  const [disabled, setDisabled] = useState(false);
  const { userInfo } = useContext(UserInfoContext);

  const EDIT_URL = "https://projeto13-mywallet-ipt.herokuapp.com/entry";

  const navigate = useNavigate();

  function updateEditInfo(event) {
    const { name, value } = event.target;
    setEditInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function submitEdit(event) {
    event.preventDefault();
    setDisabled(true);

    const body = { ...editInfo };
    delete body._id;
    delete body.date;

    const promise = axios.put(`${EDIT_URL}/${editInfo._id}`, body, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    promise.then((response) => {
      navigate("/");
    });
    promise.catch((error) => {
      alert(error.response.data);
      setDisabled(false);
    });
  }

  return (
    <EditEntryContainer>
      <h2>Editar {editInfo.type === "credit" ? "Entrada" : "Saída"}</h2>
      <StyledForm onSubmit={submitEdit}>
        <input
          type="number"
          name="value"
          placeholder="Valor"
          step="0.01"
          onChange={updateEditInfo}
          disabled={disabled}
          value={editInfo.value}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={updateEditInfo}
          disabled={disabled}
          value={editInfo.description}
          required
        />
        <button type="submit" disabled={disabled}>
          {disabled ? (
            <ThreeDots color="#fff" height={40} width={40} />
          ) : (
            `Atualizar ${editInfo.type === "credit" ? "entrada" : "saída"}`
          )}
        </button>
      </StyledForm>
    </EditEntryContainer>
  );
}

const EditEntryContainer = styled.div`
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
