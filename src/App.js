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
        data.data.quotes.USD.price ===
        this.state.data[this.state.data.length - 1]
          ? null
          : this.setState({
              data: [...this.state.data, data.data.quotes.USD.price]
            });
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
    const current = this.state.data[this.state.data.length - 1];
    const prev = this.state.data[this.state.data.length - 2];

    if (this.state.data.length === 0) {
      return <Loading />;
    } else if (!prev || prev === current) {
      return <Text>{formatPrice(current)}</Text>;
    } else if (prev > current) {
      return <Fall>{formatPrice(current)}</Fall>;
    } else if (prev < current) {
      return <Rise>{formatPrice(current)}</Rise>;
    }
  }
}

export default App;
