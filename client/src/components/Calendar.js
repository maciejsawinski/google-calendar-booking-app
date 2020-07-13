import React, { useState, useEffect } from "react";

import ModalForm from "./ModalForm";

import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Calendar() {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const carouselConfig = {
    interval: null,
    indicators: false,
    activeIndex: index,
    wrap: false,
    onSelect: handleSelect,
    prevIcon: <span className="carousel-control text-dark">&lt;</span>,
    nextIcon: <span className="carousel-control text-dark">&gt;</span>,
  };

  const reactTable = (
    <div className="column-group">
      <ButtonGroup vertical className="column">
        <Button
          className="column-title-button"
          variant="outline-primary"
          disabled
        >
          <p className="column-title-text">Pon,</p>
          <p className="column-title-text">13 Lip</p>
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          8:00
        </Button>
        <Button variant="outline-primary" disabled>
          <del>9:00</del>
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          10:00
        </Button>
        <Button variant="outline-primary" disabled>
          <del>11:00</del>
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          12:00
        </Button>
        <Button variant="outline-primary" disabled>
          <del>13:00</del>
        </Button>
        <Button variant="outline-primary" disabled>
          <del>14:00</del>
        </Button>
        <Button variant="outline-primary" disabled>
          <del>15:00</del>
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical className="column">
        <Button
          className="column-title-button"
          variant="outline-primary"
          disabled
        >
          <p className="column-title-text">Pon,</p>
          <p className="column-title-text">13 Lip</p>
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          8:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          9:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          10:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          11:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          12:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          13:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          14:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          15:00
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical className="column">
        <Button
          className="column-title-button"
          variant="outline-primary"
          disabled
        >
          <p className="column-title-text">Pon,</p>
          <p className="column-title-text">13 Lip</p>
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
        <Button variant="outline-primary" disabled>
          -
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical className="column">
        <Button
          className="column-title-button"
          variant="outline-primary"
          disabled
        >
          <p className="column-title-text">Pon,</p>
          <p className="column-title-text">13 Lip</p>
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          8:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          9:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          10:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          11:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          12:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          13:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          14:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          15:00
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical className="column">
        <Button
          className="column-title-button"
          variant="outline-primary"
          disabled
        >
          <p className="column-title-text">Pon,</p>
          <p className="column-title-text">13 Lip</p>
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          8:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          9:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          10:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          11:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          12:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          13:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          14:00
        </Button>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          15:00
        </Button>
      </ButtonGroup>
    </div>
  );

  const content = (
    <>
      <Carousel {...carouselConfig}>
        <Carousel.Item>{reactTable}</Carousel.Item>
        <Carousel.Item>{reactTable}</Carousel.Item>
        <Carousel.Item>{reactTable}</Carousel.Item>
      </Carousel>
      <ModalForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );

  return (
    <div className="carousel">
      {loading ? <Spinner animation="grow" variant="primary" /> : content}
    </div>
  );
}

export default Calendar;
