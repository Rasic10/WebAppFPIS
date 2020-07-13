import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./components/default/Home";
import { FetchData } from "./components/default/FetchData";
import { Counter } from "./components/default/Counter";
import Obracuni from "./components/obracun/Obracuni";
import { NavMenu } from "./components/NavMenu";
import Subvencije from "./components/subvencije/Subvencije";

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/counter" component={Counter} />
          <Route path="/fetchdata" component={FetchData} />
          <Route path="/obracuni" component={Obracuni} />
          <Route path="/subvencije" component={Subvencije} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
