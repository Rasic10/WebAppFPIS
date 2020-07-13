import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import "./addSubvencijeModal.css";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import MaterialTable from "material-table";

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

class AddSubvencijeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sifraZahtevaID: "",
      datumIzjave: formatDate(new Date()),
      datumPodnosenja: formatDate(new Date()),
      zaposlenID: "",
      drzavniOrganID: "",
      mestoIzjaveID: "",
      mestoPodnosenjaID: "",
      stavke: "",
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

    this.postSubvencije = this.postSubvencije.bind(this);
  }

  componentDidCatch(error, info) {
    console.log("error: ", error);
    console.log("info: ", info);
  }

  // ...
  snackBarClose = (event) => {
    this.setState({ snackBarOpen: false });
  };

  //
  postSubvencije() {
    console.log(this.state);

    if (this.state.data.length === 0) {
      this.setState({
        snackBarOpen: true,
        snackBarMsg: <Alert severity="error">Stavke nisu dodate!</Alert>,
      });
      return;
    }

    if (
      this.state.drzavniOrganID === "" ||
      this.state.zaposlenID === "" ||
      this.state.mestoIzjaveID === "" ||
      this.state.mestoPodnosenjaID === ""
    ) {
      this.setState({
        snackBarOpen: true,
        snackBarMsg: <Alert severity="error">Nisu sva polja uneta!</Alert>,
      });
      return;
    }

    fetch("api/zahtevzasubvencije", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        datumIzjave: this.state.datumIzjave,
        datumPodnosenja: this.state.datumPodnosenja,
        zaposlenID: this.state.zaposlenID,
        drzavniOrganID: this.state.drzavniOrganID,
        mestoIzjaveID: this.state.mestoIzjaveID,
        mestoPodnosenjaID: this.state.mestoPodnosenjaID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((response) => {
        this.state.sifraZahtevaID = response.sifraZahtevaID;

        for (var r in this.state.data) {
          delete this.state.data[r].tableData;
          this.state.data[r].sifraZahtevaID = this.state.sifraZahtevaID;
        }

        fetch("api/stavkazahtevazasubvencije/data", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.state.data),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            } else {
              this.setState({
                snackBarOpen: true,
                snackBarMsg: (
                  <Alert severity="success">
                    Uspesno dodavanje nove subvencije!
                  </Alert>
                ),
              });
            }
          })
          .catch((error) => {
            console.log("error", error);

            this.setState({
              snackBarOpen: true,
              snackBarMsg: (
                <Alert severity="error">
                  Neuspesna dodavanje nove subvencije, popunite polja!
                </Alert>
              ),
            });
            return;
          });
      })
      .catch((error) => {
        console.log("error", error);

        this.setState({
          snackBarOpen: true,
          snackBarMsg: (
            <Alert severity="error">
              Neuspesna dodavanje nove subvencije, popunite polja!
            </Alert>
          ),
        });
        return;
      });
  }

  //
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      sifraZahtevaID,
      datumIzjave,
      datumPodnosenja,
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
              Dodavanje subvencije:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <div>
              <Row>
                <Col xs={12} md={6}>
                  <FormControl id="zaposlen" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Zaposlen
                    </InputLabel>
                    <Select
                      native
                      value={zaposlenID}
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
                          {o.nazivOrgana} {o.adresa.nazivMesta}
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
                data={data}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      newData.sifraZahtevaID = 2;
                      newData.redniBroj = 4;
                      resolve();
                      this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        newData.sifraZahtevaID = 2;
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
                    onClick={() => this.postSubvencije()}
                  >
                    Dodaj
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddSubvencijeModal;
