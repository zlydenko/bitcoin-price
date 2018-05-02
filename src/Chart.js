import React from "react";
import { XYPlot, makeWidthFlexible, GradientDefs, AreaSeries } from "react-vis";
import "../node_modules/react-vis/dist/style.css";
import styled from "styled-components";

const Wrapper = styled.section`
  background-color: peachpuff;
  margin-bottom: -2.5em;
  width: 100%;
`;

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class Chart extends React.Component {
  render() {
    const { data } = this.props;
    const gradient = (
      <GradientDefs>
        <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="300"
          y2="300"
        >
          <stop offset="10%" stopColor="yellow" />
          <stop offset="90%" stopColor="#f83600" />
        </linearGradient>
      </GradientDefs>
    );

    return (
      <Wrapper>
        <FlexibleXYPlot height={300}>
          {gradient}
          <AreaSeries
            data={data}
            color={"url(#myGradient)"}
            style={{
              strokeWidth: "7px",
              opacity: "0.8"
            }}
          />
        </FlexibleXYPlot>
      </Wrapper>
    );
  }
}
