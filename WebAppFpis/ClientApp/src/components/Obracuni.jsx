import React, { Component } from "react";
import { Button, ButtonToolbar, Row, Col } from "react-bootstrap";
//import { Link } from "react-router-dom";
import AddObracunModal from "./AddObracunModal";
import EditObracunModal from "./EditObracunModal";
import "./obracuni.css";

class Obracuni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obracuni: [],
      loading: true,
      addModalShow: false,
      editModalShow: false,
    };
  }

  // ova metoda se poziva kad se komponenta renderuje
  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  // osvezavanje liste obracuna
  refreshList() {
    fetch("api/Obracun")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ obracuni: data, loading: false });
      });
  }

  // DELETE: brisanje jednog obracuna
  delete(id) {
    if (window.confirm("Da li hocete da obrisete Obracun?")) {
      fetch("api/Obracun/" + id, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then((response) =>
        response.json().then((data) => {
          this.setState({
            obracuni: this.state.obracuni.filter(
              (obracun) => obracun.obracunID !== data.obracunID
            ),
          });
        })
      );
    }
  }

  render() {
    const {
      obracunid,
      mlekaraid,
      datumobracuna,
      periodod,
      perioddo,
      litara,
      kilograma,
      mlecnemasti,
      proteina,
      somatskecelije,
      suvamaterijabezmasti,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <div>
          {/* Obracuni: i button Dodaj obracun  */}
          <Row>
            <Col sm={6}>
              <h2>Obracuni:</h2>
            </Col>
            <Col sm={6}>
              <Button
                id="addButton"
                variant="success"
                onClick={() => this.setState({ addModalShow: true })}
              >
                Dodaj obracun
              </Button>
            </Col>
          </Row>

          <AddObracunModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          ></AddObracunModal>

          <EditObracunModal
            show={this.state.editModalShow}
            onHide={editModalClose}
            obracunid={obracunid}
            mlekaraid={mlekaraid}
            datumobracuna={datumobracuna}
            periodod={periodod}
            perioddo={perioddo}
            litara={litara}
            kilograma={kilograma}
            mlecnemasti={mlecnemasti}
            proteina={proteina}
            somatskecelije={somatskecelije}
            suvamaterijabezmasti={suvamaterijabezmasti}
          ></EditObracunModal>
        </div>

        {/* Tabela */}
        <table className="table table-borderless table-dark">
          <thead>
            <tr>
              <th>Sifra obracuna</th>
              <th>Datum</th>
              <th>Period od</th>
              <th>Period do</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {this.state.obracuni.map((obracunItem) => (
              <tr key={obracunItem.obracunID}>
                <td>{obracunItem.obracunID}</td>
                <td>
                  {new Date(obracunItem.datumObracuna).toLocaleDateString()}
                </td>
                <td>{obracunItem.periodOd}</td>
                <td>{obracunItem.periodDo}</td>
                {/* Button izmeni i obrisi */}
                <td>
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          obracunid: obracunItem.obracunID,
                          mlekaraid: obracunItem.mlekaraID,
                          datumobracuna: obracunItem.datumObracuna,
                          periodod: obracunItem.periodOd,
                          perioddo: obracunItem.periodDo,
                          litara: obracunItem.litara,
                          kilograma: obracunItem.kilograma,
                          mlecnemasti: obracunItem.mlecneMasti,
                          proteina: obracunItem.proteina,
                          somatskecelije: obracunItem.somatskeCelije,
                          suvamaterijabezmasti:
                            obracunItem.suvaMaterijaBezMasti,
                        })
                      }
                    >
                      Izmeni
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.delete(obracunItem.obracunID)}
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

export default Obracuni;
