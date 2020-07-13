import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

import "./addSubvencijeModal.css";
import MaterialTable from "material-table";
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

class EditObracunModal extends Component {
  constructor(props) {
    super(props);

    this.state = { snackBarOpen: false, snackBarMsg: "" };
    this.handelSubmit = this.handelSubmit.bind(this);

    this.state = {
      snackBarOpen: false,
      snackBarMsg: "",
      columns: [
        { title: "sifraZahtevaID", field: "sifraZahtevaID", hidden: true },
        { title: "redniBroj", field: "redniBroj", hidden: true },
        { title: "Vrsta zivotinja", field: "vrstaZivotinje" },
        { title: "Broj grla", field: "brojGrla" },
      ],
      data: [],
    };
  }

  snackBarClose = (event) => {
    this.setState({ snackBarOpen: false });
  };

  handelSubmit = (event) => {
    event.preventDefault();

    fetch("api/zahtevzasubvencije/" + event.target.sifraZahtevaID.value, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        sifraZahtevaID: event.target.sifraZahtevaID.value,
        datumIzjave: event.target.datumIzjave.value,
        datumPodnosenja: event.target.datumPodnosenja.value,
        zaposlenID: event.target.zaposlenID.value,
        drzavniOrganID: event.target.drzavniOrganID.value,
        mestoIzjaveID: event.target.mestoIzjaveID.value,
        mestoPodnosenjaID: event.target.mestoPodnosenjaID.value,
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
      sifraZahtevaID,
      datumIzjave = formatDate(this.props.datumizjave),
      datumPodnosenja = formatDate(this.props.datumpodnosenja),
      zaposlenID,
      drzavniOrganID,
      mestoIzjaveID,
      mestoPodnosenjaID,
      stavke,
      columns,
      data,
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
              Izmeni subvenciju:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handelSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Label>SubvencijaID</Form.Label>
                  <Form.Control
                    type="text"
                    name="sifraZahtevaID"
                    required
                    disabled
                    defaultValue={this.props.sifrazahtevaid}
                    placeholder="Obracun ID"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <FormControl id="zaposlen" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Zaposlen
                    </InputLabel>
                    <Select
                      native
                      value={zaposlenID}
                      defaultValue={this.props.zaposlen}
                      onChange={this.changeHandler}
                      label="Zaposlen"
                      inputProps={{
                        name: "zaposlenID",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option key="none" aria-label="None" value="" />
                      {this.props.zaposleni.map((z) => (
                        <option
                          key={z.sifraZaposlenogID}
                          value={z.sifraZaposlenogID}
                        >
                          {z.ime} {z.prezime}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col xs={12} md={6}>
                  <FormControl id="drzavniOrgan" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Drzavni organ
                    </InputLabel>
                    <Select
                      native
                      value={drzavniOrganID}
                      defaultValue={this.props.drzavniorgan}
                      onChange={this.changeHandler}
                      label="Drzavni organ"
                      inputProps={{
                        name: "drzavniOrganID",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option key="none" aria-label="None" value="" />
                      {this.props.drzavniorgani.map((o) => (
                        <option key={o.sifraOrganaID} value={o.sifraOrganaID}>
                          {o.nazivOrgana}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label>Datum izjave</Form.Label>
                  <Form.Control
                    name="datumIzjave"
                    type="date"
                    placeholder=""
                    value={datumIzjave}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Datum podnosenja</Form.Label>
                  <Form.Control
                    name="datumPodnosenja"
                    type="date"
                    placeholder=""
                    value={datumPodnosenja}
                    onChange={this.changeHandler}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <FormControl id="mestoIzjave" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      PTT mesto izjave
                    </InputLabel>
                    <Select
                      native
                      value={mestoIzjaveID}
                      defaultValue={this.props.mestoizjave}
                      onChange={this.changeHandler}
                      label="PTT mesto izjave"
                      inputProps={{
                        name: "mestoIzjaveID",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option key="none" aria-label="None" value="" />
                      {this.props.mesta.map((m) => (
                        <option key={m.mestoID} value={m.mestoID}>
                          {m.nazivMesta} {m.pttMestaID}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col xs={12} md={6}>
                  <FormControl id="mestoPodnosenja" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      PTT mesto podnosenja
                    </InputLabel>
                    <Select
                      native
                      value={mestoPodnosenjaID}
                      defaultValue={this.props.mestopodnosenja}
                      onChange={this.changeHandler}
                      label="PTT mesto podnosenja"
                      inputProps={{
                        name: "mestoPodnosenjaID",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option key="none" aria-label="None" value="" />
                      {this.props.mesta.map((m) => (
                        <option key={m.mestoID} value={m.mestoID}>
                          {m.nazivMesta} {m.pttMestaID}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <MaterialTable
                id="tabelaStavke"
                title="Stavke zahteva za subvencije"
                columns={columns}
                data={this.props.stavke}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        newData.sifraZahtevaID = this.props.sifrazahtevaid;
                        newData.redniBroj = 4;
                        resolve();
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data.push(newData);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        newData.sifraZahtevaID = this.props.sifrazahtevaid;
                        newData.redniBroj = 4;
                        resolve();
                        if (oldData) {
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                }}
              />
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
