import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  IoMdExit,
  IoMdAddCircleOutline,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import axios from "axios";

import UserInfoContext from "../context/UserInfoContext";
import EntryLine from "./EntryLine";

export default function MainScreen() {
  const { userInfo, setUserInfo, setEntryType } = useContext(UserInfoContext);
  const [entries, setEntries] = useState([]);

  const URL_ENTRIES = "https://projeto13-mywallet-ipt.herokuapp.com/entry";

  useEffect(() => {
    const promise = axios.get(URL_ENTRIES, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    promise.then(({ data }) => {
      setEntries(data);
    });
    promise.catch((error) => console.log(error.response));
  }, [userInfo]);

  const navigate = useNavigate();

  let total = 0;

  function addNewEntry(type) {
    setEntryType(type);
    navigate("/new-entry");
  }

  function logout() {
    localStorage.clear();
    setUserInfo({});
    navigate("/");
  }

  return (
    <MainScreenContainer>
      <header>
        <h2>Olá, {userInfo.name}</h2>
        <IoMdExit className="exit-icon" onClick={logout} />
      </header>
      <MainContent>
        {entries.length > 0 ? (
          <>
            <ul>
              {entries.map((entry, index) => {
                if (entry.type === "credit") {
                  total += entry.value;
                } else {
                  total -= entry.value;
                }
                return <EntryLine key={index} entry={entry} />;
              })}
            </ul>
            <Total>
              <h3>SALDO</h3>
              <h4 className={total >= 0 ? "credit" : "debit"}>
                {Math.abs(total).toFixed(2).replace(".", ",")}
              </h4>
            </Total>
          </>
        ) : (
          <p>Não há registros de entrada ou saída</p>
        )}
      </MainContent>
      <Entries>
        <Entry onClick={() => addNewEntry("credit")}>
          <IoMdAddCircleOutline className="add-icon" />
          <p>Nova entrada</p>
        </Entry>
        <Entry onClick={() => addNewEntry("debit")}>
          <IoMdRemoveCircleOutline className="add-icon" />
          <p>Nova saída</p>
        </Entry>
      </Entries>
    </MainScreenContainer>
  );
}

const MainScreenContainer = styled.div`
  width: 100%;
  padding: 25px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;

    h2 {
      color: #fff;
      font-size: 26px;
      font-weight: bold;
      line-height: 31px;
    }

    .exit-icon {
      color: #fff;
      font-size: 24px;
    }
  }
`;

const MainContent = styled.div`
  width: 100%;
  background-color: #fff;
  height: 446px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 23px 7px 10px;
  margin-bottom: 13px;

  p {
    height: 46px;
    width: 180px;
    color: #868686;
    text-align: center;
    font-size: 20px;
    line-height: 23px;
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Entries = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Entry = styled.div`
  width: 155px;
  height: 114px;
  position: relative;
  top: 0;
  left: 0;
  background-color: #a328d6;
  border-radius: 5px;

  .add-icon {
    font-size: 24px;
    color: #fff;
    position: absolute;
    top: 9px;
    left: 8px;
  }

  p {
    width: 64px;
    height: 40px;
    font-size: 17px;
    font-weight: bold;
    line-height: 20px;
    color: #fff;
    position: absolute;
    bottom: 9px;
    left: 10px;
  }
`;

const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 17px;
    font-weight: bold;
    line-height: 20px;
    color: #000;
  }

  h4 {
    font-size: 17px;
    line-height: 20px;
    opacity: 0.9;
  }

  .credit {
    color: #03ac00;
  }

  .debit {
    color: #c70000;
  }
`;
