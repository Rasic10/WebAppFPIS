import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import "./addObracunModal.css";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import { FormControl, InputLabel, Select } from "@material-ui/core";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  // console.log("datum:::", [year, month, day].join('-'));
  return [year, month, day].join("-");
}

class AddObracunModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obracunID: "",
      mlekaraID: "",
      datumObracuna: formatDate(new Date()),
      periodOd: "Januar",
      periodDo: "Januar",
      litara: "",
      kilograma: "",
      mlecneMasti: "",
      proteina: "",
      somatskeCelije: "",
      suvaMaterijaBezMasti: "",
      snackBarOpen: false,
      snackBarMsg: "",
    };
  }

  snackBarClose = (event) => {
    this.setState({ snackBarOpen: false });
  };

  postObracun = (e) => {
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
    }).then((res) => {
      if (res.ok) {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: (
            <Alert severity="success">Uspesno dodavanje novog obracuna</Alert>
          ),
        });
      } else {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: (
            <Alert severity="error">Neuspesna dodavanje novog obracuna</Alert>
          ),
        });
      }
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handelSubmit = (event) => {
    event.preventDefault();

    if (
      event.target.suvaMaterijaBezMasti.value === "" ||
      event.target.somatskeCelije.value === "" ||
      event.target.proteina.value === "" ||
      event.target.mlecneMasti.value === "" ||
      event.target.kilograma.value === "" ||
      event.target.litara.value === "" ||
      event.target.mlekaraID.value === ""
    ) {
      this.setState({
        snackBarOpen: true,
        snackBarMsg: <Alert severity="error">Nisu uneta sva polja!</Alert>,
      });
      return;
    }

    this.postObracun();
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
              Dodavanje obracuna:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Form onSubmit={this.handelSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <FormControl id="mlekara" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Mlekara
                    </InputLabel>
                    <Select
                      native
                      value={mlekaraID}
                      onChange={this.changeHandler}
                      label="Mlekara"
                      inputProps={{
                        name: "mlekaraID",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {this.props.mlekare.map((m) => (
                        <option key={m.mlekaraID} value={m.mlekaraID}>
                          {m.nazivMlekare}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Datum obracuna</Form.Label>
                  <Form.Control
                    name="datumObracuna"
                    type="date"
                    placeholder=""
                    value={formatDate(new Date())}
                    onChange={this.changeHandler}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <FormControl id="periodOd" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Period od
                    </InputLabel>
                    <Select
                      native
                      value={periodOd}
                      onChange={this.changeHandler}
                      label="Period od"
                      inputProps={{
                        name: "periodOd",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option value="Januar">Januar</option>
                      <option value="Februar">Februar</option>
                      <option value="Mart">Mart</option>
                      <option value="April">April</option>
                      <option value="Maj">Maj</option>
                      <option value="Jun">Jun</option>
                      <option value="Jul">Jul</option>
                      <option value="Avgust">Avgust</option>
                      <option value="Septembar">Septembar</option>
                      <option value="Oktobar">Oktobar</option>
                      <option value="Novembar">Novembar</option>
                      <option value="Decembar">Decembar</option>
                    </Select>
                  </FormControl>
                </Col>
                <Col xs={12} md={6}>
                  <FormControl id="periodDo" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Period do
                    </InputLabel>
                    <Select
                      native
                      value={periodDo}
                      onChange={this.changeHandler}
                      label="Period do"
                      inputProps={{
                        name: "periodDo",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option value="Januar">Januar</option>
                      <option value="Februar">Februar</option>
                      <option value="Mart">Mart</option>
                      <option value="April">April</option>
                      <option value="Maj">Maj</option>
                      <option value="Jun">Jun</option>
                      <option value="Jul">Jul</option>
                      <option value="Avgust">Avgust</option>
                      <option value="Septembar">Septembar</option>
                      <option value="Oktobar">Oktobar</option>
                      <option value="Novembar">Novembar</option>
                      <option value="Decembar">Decembar</option>
                    </Select>
                  </FormControl>
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
                    isInvalid={!isFinite(litara)}
                    isValid={litara !== "" && isFinite(litara)}
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
                    isInvalid={!isFinite(kilograma)}
                    isValid={kilograma !== "" && isFinite(kilograma)}
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
                    isInvalid={!isFinite(mlecneMasti)}
                    isValid={mlecneMasti !== "" && isFinite(mlecneMasti)}
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
                    isInvalid={!isFinite(proteina)}
                    isValid={proteina !== "" && isFinite(proteina)}
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
                    isInvalid={!isFinite(somatskeCelije)}
                    isValid={somatskeCelije !== "" && isFinite(somatskeCelije)}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Label>Suva materija bez masti</Form.Label>
                  <Form.Control
                    id="suvaMaterijaBezMasti"
                    name="suvaMaterijaBezMasti"
                    type="text"
                    placeholder=""
                    value={suvaMaterijaBezMasti}
                    isInvalid={!isFinite(suvaMaterijaBezMasti)}
                    isValid={
                      suvaMaterijaBezMasti !== "" &&
                      isFinite(suvaMaterijaBezMasti)
                    }
                    onChange={this.changeHandler}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Button onClick={this.props.onHide}>Close</Button>
                </Col>
                <Col xs={6} md={6}>
                  <Button
                    id="addButton"
                    type="submit"
                    variant="primary"
                    //onClick={this.postObracun}
                  >
                    Dodaj
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Container></Container>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddObracunModal;
