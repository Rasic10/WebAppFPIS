import React, { Component } from "react";
import axios from "axios";

export class FetchData extends Component {
  displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    // fetch("api/SampleData/WeatherForecasts")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({ forecasts: data, loading: false });
    //   });

    axios.get(`https://localhost:5001/api/values`).then((res) => {
      const persons = res.data;
      this.setState({ forecasts: persons, loading: false });
    });

    // LOGIN

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      emailAddress: "paolo.accorti@gmail.com",
      password: "d58a7cfca32529d3f53ce8bdbf71bb0b",
    });

    var requestOptions = {
      method: "POST",
      url: "https://localhost:5001/api/Users/Login",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://localhost:5001/api/Users/Login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        console.log(localStorage.getItem("accessToken"));
      })
      .catch((error) => console.log("error", error));

    const AuthStr = "Bearer " + localStorage.getItem("accessToken");

    axios
      .get(`https://localhost:5001/api/Authors/GetAuthors`, {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        // If request is good...
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
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
      FetchData.renderForecastsTable(this.state.forecasts)
    );

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
