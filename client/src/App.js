import React from "react";

import Calendar from "./components/Calendar";
import Footer from "./components/Footer";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import "./App.scss";

function App() {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1 className="text-white font-weight-bold text-center">
            Zarezerwuj wizytę
          </h1>
        </Container>
      </Jumbotron>
      <Container>
        <Calendar />
      </Container>
      <Footer />
    </>
  );
}

export default App;
