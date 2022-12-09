import React from "react";
import Main from "../components/Main/Main";
import Modal from "../components/Modal/Modal";
import { ModalContextProvider } from "../contexts/Modal";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <Modal />
        <Main />
      </ModalContextProvider>
    </div>
  );
}

export default App;
