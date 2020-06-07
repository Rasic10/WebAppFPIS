import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import "./addObracunModal.css";

class AddObracunModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obracunID: "",
      mlekaraID: "",
      datumObracuna: "",
      periodOd: "",
      periodDo: "",
      litara: "",
      kilograma: "",
      mlecneMasti: "",
      proteina: "",
      somatskeCelije: "",
      suvaMaterijaBezMasti: "",
    };
  }

  postObracun = (e) => {
    e.preventDefault();
    console.log(this.state);
    fetch("api/Obracun", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mlekaraID: this.state.mlekaraID,
        datumObracuna: this.state.datumObracuna,
        periodOd: this.state.periodOd,
        periodDo: this.state.periodDo,
        litara: this.state.litara,
        kilograma: this.state.kilograma,
        mlecneMasti: this.state.mlecneMasti,
        proteina: this.state.proteina,
        somatskeCelije: this.state.somatskeCelije,
        suvaMaterijaBezMasti: this.state.suvaMaterijaBezMasti,
      }),
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      mlekaraID,
      datumObracuna,
      periodOd,
      periodDo,
      litara,
      kilograma,
      mlecneMasti,
      proteina,
      somatskeCelije,
      suvaMaterijaBezMasti,
    } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Dodavanje obracuna:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <div>
            <Row>
              <Col xs={12} md={6}>
                <Form.Label>Mlekara</Form.Label>
                <Form.Control
                  name="mlekaraID"
                  type="text"
                  placeholder=""
                  value={mlekaraID}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col xs={12} md={6}>
                <Form.Label>Datum obracuna</Form.Label>
                <Form.Control
                  name="datumObracuna"
                  type="date"
                  placeholder=""
                  value={datumObracuna}
                  onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Label>Period od</Form.Label>
                <Form.Control
                  name="periodOd"
                  type="text"
                  placeholder=""
                  value={periodOd}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col xs={12} md={6}>
                <Form.Label>Period do</Form.Label>
                <Form.Control
                  name="periodDo"
                  type="text"
                  placeholder=""
                  value={periodDo}
                  onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <Form.Label>Litara</Form.Label>
                <Form.Control
                  name="litara"
                  type="text"
                  placeholder=""
                  value={litara}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Label>Kilograma</Form.Label>
                <Form.Control
                  name="kilograma"
                  type="text"
                  placeholder=""
                  value={kilograma}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Label>Mlecne masti</Form.Label>
                <Form.Control
                  name="mlecneMasti"
                  type="text"
                  placeholder=""
                  value={mlecneMasti}
                  onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <Form.Label>Proteina</Form.Label>
                <Form.Control
                  name="proteina"
                  type="text"
                  placeholder=""
                  value={proteina}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Label>Somatske celije</Form.Label>
                <Form.Control
                  name="somatskeCelije"
                  type="text"
                  placeholder=""
                  value={somatskeCelije}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Label>Suva materija bez masti</Form.Label>
                <Form.Control
                  name="suvaMaterijaBezMasti"
                  type="text"
                  placeholder=""
                  value={suvaMaterijaBezMasti}
                  onChange={this.changeHandler}
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col xs={6} md={6}>
                <Button onClick={this.props.onHide}>Close</Button>
              </Col>
              <Col xs={6} md={6}>
                <Button
                  id="addButton"
                  type="submit"
                  variant="primary"
                  onClick={this.postObracun}
                >
                  Dodaj
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddObracunModal;
