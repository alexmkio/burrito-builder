import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <>
      <Header />
      <main>
        <Form />
        <Orders />
      </main>
    </>
  );
}

export default App;
