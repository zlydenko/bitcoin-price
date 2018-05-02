import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import "../node_modules/react-vis/dist/style.css";
import { Loading, Text, Fall, Rise } from "./styled";
import formatPrice from "./utils";
import { XYPlot, makeWidthFlexible, GradientDefs, LineSeries } from "react-vis";

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

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
    const { data } = this.state;
    const newPrice = data[data.length - 1];
    const prevPrice = data[data.length - 2];

    const gradient = (
      <GradientDefs>
        <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
        >
          <stop offset="0%" stopColor="#EDDE5D" />
          <stop offset="25%" stopColor="gold" />
          <stop offset="55%" stopColor="#fe8c00" />
          <stop offset="100%" stopColor="#f83600" />
        </linearGradient>
      </GradientDefs>
    );

    if (data.length === 0) {
      return <Loading />;
    } else if (!prevPrice || prevPrice.x === newPrice.x) {
      return (
        <Fragment>
          <Text>{formatPrice(newPrice.x)}</Text>
          <div>
            {this.state.history && (
              <FlexibleXYPlot height={200}>
                {gradient}
                <LineSeries
                  data={this.state.history}
                  color={"url(#myGradient)"}
                  style={{
                    strokeWidth: "7px",
                    opacity: "0.8"
                  }}
                />
              </FlexibleXYPlot>
            )}
          </div>
        </Fragment>
      );
    } else if (prevPrice.x > newPrice.x) {
      return (
        <Fragment>
          <Fall>{formatPrice(newPrice.x)}</Fall>
          <div>
            {this.state.history && (
              <FlexibleXYPlot height={200}>
                {gradient}
                <LineSeries data={this.state.history} color={"powderblue"} />
              </FlexibleXYPlot>
            )}
          </div>
        </Fragment>
      );
    } else if (prevPrice.x < newPrice.x) {
      return (
        <Fragment>
          <Rise>{formatPrice(newPrice.x)}</Rise>
          <div>
            {this.state.history && (
              <FlexibleXYPlot height={200}>
                {gradient}
                <LineSeries data={this.state.history} color={"powderblue"} />
              </FlexibleXYPlot>
            )}
          </div>
        </Fragment>
      );
    }
  }
}

export default App;
