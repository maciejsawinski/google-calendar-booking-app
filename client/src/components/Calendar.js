import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/pl";

import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import useMountEffect from "../hooks/useMountEffect";

import ModalForm from "./ModalForm";

moment.locale("pl");

const Calendar = () => {
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);
  const [tables, setTables] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [modalDate, setModalDate] = useState(moment());

  useMountEffect(() => {
    (async () => {
      await fetchData();
      console.log("(⌐▨_▨)");
    })().catch((err) => {
      console.log(err);
      setLoading(false);
    });
  });

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8080/api/v1/events");
    createTables(res.data.data);
    setLoading(false);
  };

  const createTables = (calendarEvents) => {
    const tables = calendarEvents.map((event) => {
      const buttons = event
        .map(({ time, isBooked }) => {
          time = moment(time);

          let displayTime;
          if (["sob", "ndz"].includes(time.format("ddd"))) {
            isBooked = true;
            displayTime = "-";
          } else {
            displayTime = time.format("HH:mm");
          }

          const buttonConfig = {
            key: time,
            variant: isBooked ? "outline-warning" : "warning",
            onClick: isBooked ? undefined : () => openModal(time),
            disabled: isBooked,
          };

          return (
            <Button {...buttonConfig}>
              {isBooked && displayTime !== "-" ? (
                <del>{displayTime}</del>
              ) : (
                displayTime
              )}
            </Button>
          );
        })
        .reduce((prev, curr) => [prev, "", curr]);

      const table = (
        <ButtonGroup
          key={moment(event[0].time).format("D MMM")}
          vertical
          className="column"
        >
          <Button className="column-title-button" variant="warning" disabled>
            <p className="column-title-text">
              {moment(event[0].time).format("ddd")},
            </p>
            <p className="column-title-text">
              {moment(event[0].time).format("D MMM")}
            </p>
          </Button>
          {buttons}
        </ButtonGroup>
      );

      return table;
    });

    setTables(
      new Array(Math.ceil(tables.length / 5))
        .fill()
        .map((_) => tables.splice(0, 5))
    );
  };

  const openModal = (date) => {
    setModalDate(date);
    setModalShow(true);
  };

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

  const carouselContent = (
    <Carousel {...carouselConfig}>
      <Carousel.Item>
        <div className="column-group">{tables[0]}</div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="column-group">{tables[1]}</div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="column-group">{tables[2]}</div>
      </Carousel.Item>
    </Carousel>
  );

  return (
    <>
      <div className="carousel">
        {loading ? (
          <Spinner animation="grow" variant="warning" />
        ) : (
          carouselContent
        )}
      </div>
      <ModalForm
        show={modalShow}
        date={modalDate}
        onHide={() => setModalShow(false)}
        fetchData={() => fetchData()}
      />
    </>
  );
};

export default Calendar;
