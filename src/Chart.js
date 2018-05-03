import React from "react";
import styled from "styled-components";
import { AreaChart } from "react-easy-chart";

export default class Chart extends React.Component {
  state = {
    windowWidth: window.innerWidth > 0 ? window.innerWidth : 500
  };

  render() {
    return (
      <div>
        <AreaChart
          style={{ marginBottom: "-1em" }}
          areaColors={["orange"]}
          interpolate={"cardinal"}
          width={this.state.windowWidth}
          height={200}
          data={[[...this.props.data]]}
        />
      </div>
    );
  }
}
