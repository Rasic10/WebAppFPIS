import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

class ObracunForma extends Component {
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
        litara: 12,
        kilograma: 11,
        mlecneMasti: 121,
        proteina: 10,
        somatskeCelije: 111,
        suvaMaterijaBezMasti: 114,
      }),
    });
  };

  async postObracunData() {
    try {
      console.log(this.state.periodOd);
      let result = await fetch("api/Obracun", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          mlekaraID: 2,
          datumObracuna: "2019-12-09T00:00:00",
          periodOd: this.state.periodOd,
          periodDo: this.state.periodDo,
          litara: 12,
          kilograma: 11,
          mlecneMasti: 121,
          proteina: 10,
          somatskeCelije: 111,
          suvaMaterijaBezMasti: 114,
        }),
      });

      console.log("Result: " + result);
    } catch (e) {
      console.log(e);
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.periodDo);
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
      <form>
        <Form.Group controlId="formBasicText">
          <h2>Dodavanje obracuna:</h2>
          <Form.Label>Mlekara</Form.Label>
          <Form.Control
            name="mlekaraID"
            type="text"
            placeholder=""
            value={mlekaraID}
            onChange={this.changeHandler}
          />
          <Form.Label>Datum obracuna</Form.Label>
          <Form.Control
            name="datumObracuna"
            type="text"
            placeholder=""
            value={datumObracuna}
            onChange={this.changeHandler}
          />
          <Form.Label>Period od</Form.Label>
          <Form.Control
            name="periodOd"
            type="text"
            placeholder=""
            value={periodOd}
            onChange={this.changeHandler}
          />
          <Form.Label>Period do</Form.Label>
          <Form.Control
            name="periodDo"
            type="text"
            placeholder=""
            value={periodDo}
            onChange={this.changeHandler}
          />
          <Form.Label>Litara</Form.Label>
          <Form.Control
            name="litara"
            type="text"
            placeholder=""
            value={litara}
            onChange={this.changeHandler}
          />
          <Form.Label>Kilograma</Form.Label>
          <Form.Control
            name="kilograma"
            type="text"
            placeholder=""
            value={kilograma}
            onChange={this.changeHandler}
          />
          <Form.Label>Mlecne masti</Form.Label>
          <Form.Control
            name="mlecneMasti"
            type="text"
            placeholder=""
            value={mlecneMasti}
            onChange={this.changeHandler}
          />
          <Form.Label>Proteina</Form.Label>
          <Form.Control
            name="proteina"
            type="text"
            placeholder=""
            value={proteina}
            onChange={this.changeHandler}
          />
          <Form.Label>Somatske celije</Form.Label>
          <Form.Control
            name="somatskeCelije"
            type="text"
            placeholder=""
            value={somatskeCelije}
            onChange={this.changeHandler}
          />
          <Form.Label>Suva materija bez masti</Form.Label>
          <Form.Control
            name="suvaMaterijaBezMasti"
            type="text"
            placeholder=""
            value={suvaMaterijaBezMasti}
            onChange={this.changeHandler}
          />

          <Button
            type="submit"
            bsStyle="primary"
            onClick={this.postObracun}
            //onClick={this.submitHandler}
          >
            Dodaj
          </Button>
        </Form.Group>
      </form>
    );
  }
}

export default ObracunForma;
