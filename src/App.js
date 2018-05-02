import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";

import { Loading, Text, Fall, Rise } from "./styled";
import formatPrice from "./utils";

class App extends Component {
  state = {
    data: [],
    intervalId: {}
  };

  getData = () => {
    fetch("https://api.coinmarketcap.com/v2/ticker/1/")
      .then(res => res.json())
      .then(data => {
        console.log(
          `data: ${data.data.quotes.USD.price}$ at ${new Date(
            data.status.timestamp * 1000
          )}`
        );

        if (this.state.data.length === 0) {
          this.setState({
            data: [
              {
                x: data.data.quotes.USD.price,
                y: data.status.timestamp
              }
            ]
          });
        } else if (
          data.data.quotes.USD.price !==
          this.state.data[this.state.data.length - 1].x
        ) {
          this.setState({
            data: [
              ...this.state.data,
              { x: data.data.quotes.USD.price, y: data.status.timestamp }
            ]
          });
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const timer = setInterval(this.getData, 5000);
    this.setState({ intervalId: timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { data } = this.state;
    const newPrice = data[data.length - 1];
    const prevPrice = data[data.length - 2];

    if (data.length === 0) {
      return <Loading />;
    } else if (!prevPrice || prevPrice.x === newPrice.x) {
      return <Text>{formatPrice(newPrice.x)}</Text>;
    } else if (prevPrice.x > newPrice.x) {
      return <Fall>{formatPrice(newPrice.x)}</Fall>;
    } else if (prevPrice.x < newPrice.x) {
      return <Rise>{formatPrice(newPrice.x)}</Rise>;
    }
  }
}

export default App;
