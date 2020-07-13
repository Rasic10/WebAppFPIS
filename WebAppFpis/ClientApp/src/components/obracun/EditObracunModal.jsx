import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

import "./addObracunModal.css";
import { InputLabel, Select, FormControl } from "@material-ui/core";

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
        mlekaraID: this.props.mlekaraid,
        datumObracuna: event.target.datumObracuna.value,
        periodOd: event.target.periodOd.value,
        periodDo: event.target.periodDo.value,
        litara: this.state.litara,
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

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      mlekaraID,
      datumObracuna,
      periodOd,
      periodDo,
      litara = this.props.litara,
      kilograma = this.props.kilograma,
      mlecneMasti = this.props.mlecnemasti,
      proteina = this.props.proteina,
      somatskeCelije = this.props.somatskecelije,
      suvaMaterijaBezMasti = this.props.suvamaterijabezmasti,
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
                  <Form.Label>Mlekara</Form.Label>
                  <Form.Control
                    type="text"
                    name="mlekaraID"
                    required
                    disabled
                    defaultValue={this.props.mlekara}
                    placeholder="Mlekara ID"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Datum obracuna</Form.Label>
                  <Form.Control
                    type="date"
                    name="datumObracuna"
                    defaultValue={formatDate(this.props.datumobracuna)}
                    placeholder="Datum Obracuna"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FormControl id="periodOd" name="periodOd" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Period od
                    </InputLabel>
                    <Select
                      native
                      defaultValue={this.props.periodod}
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
                <Col sm={6}>
                  <FormControl id="periodDo" name="periodDo" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Period do
                    </InputLabel>
                    <Select
                      native
                      defaultValue={this.props.perioddo}
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
                <Col sm={4}>
                  <Form.Label>Litara</Form.Label>
                  <Form.Control
                    type="text"
                    name="litara"
                    required
                    value={litara}
                    isInvalid={!isFinite(litara)}
                    isValid={litara !== "" && isFinite(litara)}
                    onChange={this.changeHandler}
                    placeholder="Litara"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Kilograma</Form.Label>
                  <Form.Control
                    type="text"
                    name="kilograma"
                    value={kilograma}
                    isInvalid={!isFinite(kilograma)}
                    isValid={kilograma !== "" && isFinite(kilograma)}
                    onChange={this.changeHandler}
                    placeholder="Kilograma"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Mlecne masti</Form.Label>
                  <Form.Control
                    type="text"
                    name="mlecneMasti"
                    value={mlecneMasti}
                    isInvalid={!isFinite(mlecneMasti)}
                    isValid={mlecneMasti !== "" && isFinite(mlecneMasti)}
                    onChange={this.changeHandler}
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
                    value={proteina}
                    isInvalid={!isFinite(proteina)}
                    isValid={proteina !== "" && isFinite(proteina)}
                    onChange={this.changeHandler}
                    placeholder="Proteina"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Somatske celije</Form.Label>
                  <Form.Control
                    type="text"
                    name="somatskeCelije"
                    value={somatskeCelije}
                    isInvalid={!isFinite(somatskeCelije)}
                    isValid={somatskeCelije !== "" && isFinite(somatskeCelije)}
                    onChange={this.changeHandler}
                    placeholder="Somatske celije"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Suva materija bez masti</Form.Label>
                  <Form.Control
                    type="text"
                    name="suvaMaterijaBezMasti"
                    value={suvaMaterijaBezMasti}
                    isInvalid={!isFinite(suvaMaterijaBezMasti)}
                    isValid={
                      suvaMaterijaBezMasti !== "" &&
                      isFinite(suvaMaterijaBezMasti)
                    }
                    onChange={this.changeHandler}
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
