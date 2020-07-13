import React, { Component } from "react";
import { Row, Col, Button, ButtonToolbar } from "react-bootstrap";
import AddSubvencije from "./AddSubvencije";
import EditSubvencijeModal from "./EditSubvencijeModal";
import MaterialTable from "material-table";

class Subvencije extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obracuni: [],
      loading: true,
      addModalShow: false,
      editModalShow: false,
      zaposleni: [],
      drzavniOrgani: [],
      mesta: [],
    };
  }

  componentDidMount() {
    this.refreshList();

    fetch("http://localhost:55266/api/zaposlen/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ zaposleni: data });
      });

    fetch("http://localhost:55266/api/drzavniOrgan/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ drzavniOrgani: data });
      });

    fetch("http://localhost:55266/api/mesto/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ mesta: data });
      });
  }

  componentDidUpdate() {
    if (this.state.addModalShow === false) this.refreshList();
  }

  // osvezavanje liste subvencije
  refreshList() {
    fetch("http://localhost:55266/api/ZahtevZaSubvencije/")
      .then((response) => response.json())
      .then((data) => {
        this.setState((state) => {
          return { obracuni: data, loading: false };
        });
      });
  }

  // DELETE: brisanje jednog subvencije
  delete(id) {
    if (window.confirm("Da li hocete da obrisete Obracun?")) {
      fetch("api/ZahtevZaSubvencije/" + id, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then((response) =>
        response.json().then((data) => {
          this.setState({
            obracuni: this.state.obracuni.filter(
              (obracun) => obracun.sifraZahtevaID !== data.sifraZahtevaID
            ),
          });
        })
      );
    }
  }

  render() {
    const {
      sifraZahtevaID,
      datumIzjave,
      datumPodnosenja,
      zaposlen,
      drzavniOrgan,
      mestoIzjave,
      mestoPodnosenja,
      stavke,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <div>
          <Row>
            <Col sm={6}>
              <h2>Subvencije:</h2>
            </Col>
            <Col sm={6}>
              <Button
                id="addButton"
                variant="success"
                onClick={() => this.setState({ addModalShow: true })}
              >
                Dodaj subvenciju
              </Button>
            </Col>
          </Row>
          <React.StrictMode>
            <div>
              <AddSubvencije
                show={this.state.addModalShow}
                onHide={addModalClose}
                zaposleni={this.state.zaposleni}
                drzavniorgani={this.state.drzavniOrgani}
                mesta={this.state.mesta}
              ></AddSubvencije>
              <EditSubvencijeModal
                show={this.state.editModalShow}
                onHide={editModalClose}
                sifrazahtevaid={sifraZahtevaID}
                datumizjave={datumIzjave}
                datumpodnosenja={datumPodnosenja}
                zaposlen={zaposlen}
                drzavniorgan={drzavniOrgan}
                mestoizjave={mestoIzjave}
                mestopodnosenja={mestoPodnosenja}
                stavke={stavke}
                zaposleni={this.state.zaposleni}
                drzavniorgani={this.state.drzavniOrgani}
                mesta={this.state.mesta}
              ></EditSubvencijeModal>
            </div>
          </React.StrictMode>
        </div>
        {/* Tabela */}
        <table className="table table-borderless table-dark">
          <thead>
            <tr>
              <th>Sifra zahteva</th>
              <th>Zaposlen</th>
              <th>Drzavrni organ</th>
              <th>Mesto izjave</th>
              <th>Mesto podnosenja</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {this.state.obracuni.map((subItem) => (
              <tr key={subItem.sifraZahtevaID}>
                <td>{subItem.sifraZahtevaID}</td>
                <td>
                  {subItem.zaposlen.ime} {subItem.zaposlen.prezime}
                </td>
                <td>{subItem.drzavniOrgan.nazivOrgana}</td>
                <td>{subItem.mestoIzjave.nazivMesta}</td>
                <td>{subItem.mestoPodnosenja.nazivMesta}</td>

                <td>
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          sifraZahtevaID: subItem.sifraZahtevaID,
                          datumIzjave: subItem.datumIzjave,
                          datumPodnosenja: subItem.datumPodnosenja,
                          zaposlen: subItem.zaposlenID,
                          drzavniOrgan: subItem.drzavniOrganID,
                          mestoIzjave: subItem.mestoIzjaveID,
                          mestoPodnosenja: subItem.mestoPodnosenjaID,
                          stavke: subItem.stavke,
                        })
                      }
                    >
                      Izmeni
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.delete(subItem.sifraZahtevaID)}
                    >
                      Obriši
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Subvencije;
