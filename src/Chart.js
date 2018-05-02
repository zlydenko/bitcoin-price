import React from "react";
import { XYPlot, makeWidthFlexible, GradientDefs, LineSeries } from "react-vis";
import "../node_modules/react-vis/dist/style.css";

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

    return (
      <FlexibleXYPlot height={200}>
        {gradient}
        <LineSeries
          data={data}
          color={"url(#myGradient)"}
          style={{
            strokeWidth: "7px",
            opacity: "0.8"
          }}
        />
      </FlexibleXYPlot>
    );
  }
}
