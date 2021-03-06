import React from "react";
import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`;

const Arrow = styled.span`
  font-size: 0.8em;
`;

export const Text = styled.p`
  font-size: 2em;
  text-align: center;
  animation: ${FadeIn} 0.7s linear 1;
`;

const RiseText = Text.extend`
  color: green;
`;

const FallText = Text.extend`
  color: red;
`;

const ArrowUp = () => <Arrow>&#129065;</Arrow>;

const ArrowDown = () => <Arrow>&#129067;</Arrow>;

export const Rise = props => (
  <RiseText>
    {props.children}
    <ArrowUp />
  </RiseText>
);

export const Fall = props => (
  <FallText>
    {props.children}
    <ArrowDown />
  </FallText>
);

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Bottom = styled.div`
  margin-top: -20px;
  height: 1000px;
  width: 100%;
  background-color: rgb(25, 27, 42);
`;

const Top = styled.div`
  height: 100px;
  background-color: rgb(20, 19, 33);
`;

const Svg = styled.svg`
  background-color: rgb(20, 19, 33);
`;

export const Background = props => (
  <Wrapper>
    <Content>{props.children}</Content>
    <Top />
    <Svg
      viewBox="0 -50 700 100"
      width="100%"
      height="200"
      preserveAspectRatio="none"
    >
      <path
        d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700"
        fill="rgb(25,27,42)"
      />
    </Svg>
    <Bottom />
  </Wrapper>
);

export const Data = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HistoryData = styled.div`
  padding: 0em 1em;
  text-align: center;
  color: rgb(67, 66, 80);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.3em;

  & p {
    display: flex;
    justify-content: space-between;
    font-weight: 400;

    & span:nth-child(2n) {
      color: rgb(255, 255, 255);
      letter-spacing: 0.05em;
      font-weight: 900;
    }
  }
`;

export const Price = styled.div`
  margin-top: 2em;
  font-family: "Source Code Pro", monospace;
  font-weight: 600;
  color: white;

  & sup {
    font-size: 0.7em;
    color: rgb(67, 66, 80);
  }
`;
