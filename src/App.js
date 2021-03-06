import React, { Component, Fragment } from "react";
import { RingLoader } from "react-spinners";
import "./index.css";
import {
  Price,
  HistoryData,
  Data,
  Background,
  Text,
  Fall,
  Rise
} from "./styled";
import formatPrice from "./utils";

import Chart from "./Chart";

class App extends Component {
  state = {
    history: [],
    data: [],
    marketCap: {},
    volume: {},
    intervalId: {},
    loading: true
  };

  getData = () => {
    fetch("https://api.coinmarketcap.com/v2/ticker/1/")
      .then(res => res.json())
      .then(data => {
        if (this.state.data.length === 0) {
          this.setState({
            loading: false,
            marketCap: data.data.quotes.USD.market_cap,
            volume: data.data.quotes.USD.volume_24h,
            data: [
              {
                x: data.data.quotes.USD.price,
                y: data.metadata.timestamp
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
              { x: data.data.quotes.USD.price, y: data.metadata.timestamp }
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
          return { x: value.time, y: value.close };
        });
        this.setState({
          history: [...arr]
        });
      });
  };

  componentDidMount() {
    this.getHistory();
    const timer = setInterval(this.getData, 10000);
    this.setState({ intervalId: timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { data, history, marketCap, volume, loading } = this.state;
    const next = data[data.length - 1];
    const prev = data[data.length - 2];

    return (
      <Background>
        <Data>
          {loading && (
            <div
              style={{
                marginTop: "4em",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <RingLoader style={{}} color={"#B10DC9"} loading={loading} />
            </div>
          )}
          {data.length !== 0 && (
            <Fragment>
              <Price>
                {prev === undefined ? (
                  <Text>
                    <sup>$</sup>
                    {formatPrice(next.x)}
                  </Text>
                ) : (
                  <Fragment>
                    {prev.x === next.x && (
                      <Text>
                        <sup>$</sup>
                        {formatPrice(next.x)}
                      </Text>
                    )}
                    {prev.x > next.x && (
                      <Fall>
                        <sup>$</sup>
                        {formatPrice(next.x)}
                      </Fall>
                    )}
                    {prev.x < next.x && (
                      <Rise>
                        <sup>$</sup>
                        {formatPrice(next.x)}
                      </Rise>
                    )}
                  </Fragment>
                )}
              </Price>
              <HistoryData>
                <p>
                  <span>{"Market cap"}</span>
                  <span>{`${formatPrice(marketCap)}$`}</span>
                </p>
                <p>
                  <span>{"Volume 24h"}</span>
                  <span>{`${formatPrice(volume)}$`}</span>
                </p>
              </HistoryData>
            </Fragment>
          )}

          {history && <Chart data={history} />}
        </Data>
      </Background>
    );
  }
}

export default App;
