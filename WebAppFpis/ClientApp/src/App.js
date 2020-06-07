import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import Obracuni from "./components/Obracuni";
import { NavMenu } from "./components/NavMenu";

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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
