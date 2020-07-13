import React from "react";

import Calendar from "./components/Calendar";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="mt-5 text-dark font-weight-bold">Umów wizytę</h1>
        <Calendar />
      </div>
      <Footer />
    </>
  );
}

export default App;
