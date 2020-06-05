import React, { Component } from "react";

class Obracun extends Component {
  displayName = Obracun.name;

  constructor(props) {
    super(props);
    this.state = { obracun: [], loading: true };

    fetch("api/Obracun")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ obracun: data, loading: false });
      });
  }

  static renderObracunTable(obracun) {
    return (
      <table className="table table-borderless table-dark">
        <thead>
          <tr>
            <th>Sifra obracuna</th>
            <th>Datum</th>
            <th>Period od</th>
            <th>Period do</th>
          </tr>
        </thead>
        <tbody>
          {obracun.map((obracun) => (
            <tr key={obracun.obracunID}>
              <td>{obracun.obracunID}</td>
              <td>{obracun.datumObracuna}</td>
              <td>{obracun.periodOd}</td>
              <td>{obracun.periodDo}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  Izmeni
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      Obracun.renderObracunTable(this.state.obracun)
    );

    return (
      <div>
        <h2>Obracuni:</h2>
        <button type="button" className="btn btn-success">
          Dodaj obracun
        </button>
        {contents}
      </div>
    );
  }
}

export default Obracun;
