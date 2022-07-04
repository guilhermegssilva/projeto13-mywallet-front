import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../theme/GlobalStyle";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import NewEntry from "./NewEntry";
import EditEntry from "./EditEntry";
import MainScreen from "./MainScreen";

import UserInfoContext from "./../context/UserInfoContext";

export default function App() {
  const loginReturnObject = localStorage.getItem("loginInfo");

  const [userInfo, setUserInfo] = useState(
    loginReturnObject ? JSON.parse(loginReturnObject) : {}
  );

  const [entryType, setEntryType] = useState("");

  return (
    <>
      <GlobalStyle />
      <UserInfoContext.Provider
        value={{ userInfo, setUserInfo, entryType, setEntryType }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
            <Route path="/wallet" element={<MainScreen />} />
            <Route path="/new-entry" element={<NewEntry />} />
            <Route path="/edit-entry" element={<EditEntry />} />
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
    </>
  );
}
