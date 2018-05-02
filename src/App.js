import React, { Component, Fragment } from "react";

import { Loading, Text, Fall, Rise } from "./styled";
import formatPrice from "./utils";

import Chart from "./Chart";

class App extends Component {
  state = {
    history: [],
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

  getHistory = () => {
    fetch(
      "https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
    )
      .then(res => res.json())
      .then(data => {
        const arr = data.Data.map(value => {
          return {
            x: value.time,
            y: value.close
          };
        });
        console.log(arr);
        this.setState({
          history: arr
        });
      });
  };

  componentDidMount() {
    this.getHistory();
    const timer = setInterval(this.getData, 5000);
    this.setState({ intervalId: timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { data, history } = this.state;
    const next = data[data.length - 1];
    const prev = data[data.length - 2];

    return (
      <Fragment>
        {data.length === 0 ? (
          <Loading />
        ) : (
          <Fragment>
            {prev === undefined ? (
              <Text>{formatPrice(next.x)}</Text>
            ) : (
              <Fragment>
                {prev.x === next.x && <Text>{formatPrice(next.x)}</Text>}
                {prev.x > next.x && <Fall>{formatPrice(next.x)}</Fall>}
                {prev.x < next.x && <Rise>{formatPrice(next.x)}</Rise>}
              </Fragment>
            )}
          </Fragment>
        )}
        {history && <Chart data={history} />}
      </Fragment>
    );
  }
}

export default App;
