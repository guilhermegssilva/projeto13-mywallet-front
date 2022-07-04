import styled from "styled-components";
import { useContext } from "react";
import axios from "axios";

import UserInfoContext from "../context/UserInfoContext";
import { useNavigate } from "react-router-dom";

export default function EntryLine({ entry }) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const navigate = useNavigate();

  const ENTRY_URL = "https://projeto13-mywallet-ipt.herokuapp.com/entry";

  function deleteEntry(entryId) {
    if (window.confirm("Você realmente deseja deletar este dado?")) {
      const promise = axios.delete(`${ENTRY_URL}/${entryId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      promise.then((response) => {
        setUserInfo({ ...userInfo });
      });
      promise.catch((error) => alert(error.response.data));
    }
  }

  function editEntry() {
    navigate("/edit-entry", { state: entry });
  }

  return (
    <StyledLine>
      <Description>
        <span>{entry.date}</span>
        <h5 className="description" onClick={editEntry}>
          {entry.description}
        </h5>
      </Description>
      <h5 className={`value ${entry.type}`}>
        {entry.value.toFixed(2).replace(".", ",")}{" "}
        <span onClick={() => deleteEntry(entry._id)}>x</span>
      </h5>
    </StyledLine>
  );
}

const StyledLine = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  .description {
    width: auto;
    height: auto;
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    color: #000;
  }

  .value {
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    opacity: 0.9;
  }

  .credit {
    color: #03ac00;
  }

  .debit {
    color: #c70000;
  }

  span {
    color: #c6c6c6;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const Description = styled.div`
  width: auto;
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
  }
`;
