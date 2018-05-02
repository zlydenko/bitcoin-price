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

export const Text = styled.p`
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

export const Loading = () => <LoadingText>Loading</LoadingText>;

const ArrowUp = () => <Arrow>&#129065;</Arrow>;

const ArrowDown = () => <Arrow>&#129067;</Arrow>;

export const Rise = props => (
  <RiseText>
    <ArrowUp />
    {props.children}
  </RiseText>
);

export const Fall = props => (
  <FallText>
    <ArrowDown />
    {props.children}
  </FallText>
);
