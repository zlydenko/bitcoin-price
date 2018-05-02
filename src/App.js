import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`;

const LoadingAnim = keyframes`
  0% {
    content: ""
  }
  
  25% {
    content: "."
  }
  
  50% {
    content: ".."
  }
  
  100% {
    content: "..."
  }
`;

const Arrow = styled.span`
  font-size: 0.8em;
`;

const Text = styled.p`
  font-size: 3em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${FadeIn} 0.7s linear 1;
`;

const LoadingText = Text.extend`
  color: #cc8;

  &::after {
    content: "";
    animation: ${LoadingAnim} 2s linear infinite;
  }
`;

const RiseText = Text.extend`
  color: green;
`;

const FallText = Text.extend`
  color: red;
`;

const Loading = () => <LoadingText>Loading</LoadingText>;

const ArrowUp = () => <Arrow>&#129065;</Arrow>;

const ArrowDown = () => <Arrow>&#129067;</Arrow>;

const Rise = props => (
  <RiseText>
    <ArrowUp />
    {props.children}
  </RiseText>
);

const Fall = props => (
  <FallText>
    <ArrowDown />
    {props.children}
  </FallText>
);

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

  formatPrice = n => {
    const options = {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    };
    return n.toLocaleString("en-US", options);
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
      return <Text>{this.formatPrice(current)}</Text>;
    } else if (prev > current) {
      return <Fall>{this.formatPrice(current)}</Fall>;
    } else if (prev < current) {
      return <Rise>{this.formatPrice(current)}</Rise>;
    }
  }
}

export default App;
