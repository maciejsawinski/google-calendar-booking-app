import React, { useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { CheckCircleIcon } from "@primer/octicons-react";

const ModalForm = ({ show, date, onHide, fetchData }) => {
  const defaultFormInputs = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const [formInputs, setFormInputs] = useState(defaultFormInputs);
  const [formValidated, setFormValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormValidated(true);

    const form = e.currentTarget;
    if (form.checkValidity()) {
      try {
        setLoading(true);
        await axios.post("http://localhost:8080/api/v1/events", {
          ...formInputs,
          date: date.format(),
        });
        setLoading(false);
        setShowAlert(false);
        setFormSubmitted(true);
        fetchData();
      } catch (err) {
        setLoading(false);
        setShowAlert(true);
      }
    }
  };

  const handleInput = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (formSubmitted) {
      setFormInputs(defaultFormInputs);
      setFormValidated(false);
      setFormSubmitted(false);
    }

    onHide();
  };

  const modalConfig = {
    show: show,
    onHide: handleClose,
    size: "lg",
    centered: true,
  };

  const { firstName, lastName, email, message } = formInputs;

  if (formSubmitted) {
    return (
      <Modal {...modalConfig}>
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" />
          </Modal.Header>
          <div className="modal-success">
            <CheckCircleIcon
              className="text-warning"
              size={160}
              verticalAlign="middle"
            />
            <br />
            <h3 className="modal-success-text">
              Zarezerwowano wizytę. Potwierdzenie wysłano na adres
              <br />
              {email}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal {...modalConfig}>
        <Form
          noValidate
          validated={formValidated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Umawianie wizyty na {date.format("LLLL")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert
              variant="danger"
              show={showAlert}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Coś poszło nie tak. Spróbuj ponownie wysłać formularz.
            </Alert>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Control
                    name="firstName"
                    placeholder="imię"
                    value={firstName}
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    name="lastName"
                    placeholder="nazwisko"
                    value={lastName}
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </Col>
              </Form.Row>
              <br />
              <Form.Control
                name="email"
                type="email"
                placeholder="adres e-mail"
                value={email}
                onChange={(e) => handleInput(e)}
                required
              />
              <br />
              <Form.Control
                name="message"
                as="textarea"
                rows="3"
                placeholder="wiadomość"
                value={message}
                onChange={(e) => handleInput(e)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {loading ? (
              <Button variant="warning" type="submit" disabled>
                <Spinner as="span" animation="border" size="sm" /> Wysyłanie...
              </Button>
            ) : (
              <Button variant="warning" type="submit">
                Wyślij
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default ModalForm;
