import React, { Component, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { render } from "react-dom";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.kudyznudy.cz/files/98/98835b0d-70a9-480a-8c43-f97c379cdfe5.jpg?v=20200609124736"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Farma Sarulja</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thecounter.org/wp-content/uploads/2019/09/regenerative_agriculture_cattle_climate_change_september_2019_.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Farma Sarulja</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cms.groupeditors.com/img/ghnw20140120-121647-565.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Farma Sarulja</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <div>
        <ControlledCarousel />
      </div>
    );
  }
}
