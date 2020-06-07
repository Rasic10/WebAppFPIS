import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

import "./addObracunModal.css";

class EditObracunModal extends Component {
  constructor(props) {
    super(props);

    this.state = { snackBarOpen: false, snackBarMsg: "" };
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  snackBarClose = (event) => {
    this.setState({ snackBarOpen: false });
  };

  handelSubmit = (event) => {
    event.preventDefault();

    fetch("api/Obracun/" + event.target.obracunID.value, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        obracunID: event.target.obracunID.value,
        mlekaraID: event.target.mlekaraID.value,
        datumObracuna: event.target.datumObracuna.value,
        periodOd: event.target.periodOd.value,
        periodDo: event.target.periodDo.value,
        litara: event.target.litara.value,
        kilograma: event.target.kilograma.value,
        mlecneMasti: event.target.mlecneMasti.value,
        proteina: event.target.proteina.value,
        somatskeCelije: event.target.somatskeCelije.value,
        suvaMaterijaBezMasti: event.target.suvaMaterijaBezMasti.value,
      }),
    }).then((res) => {
      if (res.ok) {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: <Alert severity="success">Uspesna izmena</Alert>,
        });
      } else {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: <Alert severity="error">Neuspesna izmena</Alert>,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackBarOpen}
          autoHideDuration={2000}
          onClose={this.snackBarClose}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackBarClose}
            >
              x
            </IconButton>,
          ]}
        >
          {this.state.snackBarMsg}
        </Snackbar>

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Izmeni obracun:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handelSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Label>ObracunID</Form.Label>
                  <Form.Control
                    type="text"
                    name="obracunID"
                    required
                    disabled
                    defaultValue={this.props.obracunid}
                    placeholder="Obracun ID"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Label>MlekaraID</Form.Label>
                  <Form.Control
                    type="text"
                    name="mlekaraID"
                    required
                    defaultValue={this.props.mlekaraid}
                    placeholder="Mlekara ID"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Datum obracuna</Form.Label>
                  <Form.Control
                    type="date"
                    name="datumObracuna"
                    defaultValue={this.props.datumobracuna}
                    placeholder="Datum Obracuna"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Label>Period od</Form.Label>
                  <Form.Control
                    type="text"
                    name="periodOd"
                    required
                    defaultValue={this.props.periodod}
                    placeholder="Period od"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Period do</Form.Label>
                  <Form.Control
                    type="text"
                    name="periodDo"
                    defaultValue={this.props.perioddo}
                    placeholder="Period do"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <Form.Label>Litara</Form.Label>
                  <Form.Control
                    type="text"
                    name="litara"
                    required
                    defaultValue={this.props.litara}
                    placeholder="Litara"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Kilograma</Form.Label>
                  <Form.Control
                    type="text"
                    name="kilograma"
                    defaultValue={this.props.kilograma}
                    placeholder="Kilograma"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Mlecne masti</Form.Label>
                  <Form.Control
                    type="text"
                    name="mlecneMasti"
                    defaultValue={this.props.mlecnemasti}
                    placeholder="Mlecne masti"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <Form.Label>Proteina</Form.Label>
                  <Form.Control
                    type="text"
                    name="proteina"
                    required
                    defaultValue={this.props.proteina}
                    placeholder="Proteina"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Somatske celije</Form.Label>
                  <Form.Control
                    type="text"
                    name="somatskeCelije"
                    defaultValue={this.props.somatskecelije}
                    placeholder="Somatske celije"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Suva materija bez masti</Form.Label>
                  <Form.Control
                    type="text"
                    name="suvaMaterijaBezMasti"
                    defaultValue={this.props.suvamaterijabezmasti}
                    placeholder="Suva materija bez masti"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Button id="addButton" variant="success" type="submit">
                    Izmeni Obracun
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditObracunModal;
