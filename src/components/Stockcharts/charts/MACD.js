import React, { Component } from 'react'
import { MACDSeries, } from "../lib/series";
import { YAxis } from "../lib/axes";
import { MouseCoordinateY, } from "../lib/coordinates";
import { MACDTooltip } from "../lib/tooltip";
import { format } from "d3-format";

const macdAppearance = {
    stroke: {
        macd: "#FF0000",
        signal: "#00F300",
    },
    fill: {
        divergence: "#4682B4"
    },
};

const mouseEdgeAppearance = {
    textFill: "#542605",
    stroke: "#FFFFFF",
    strokeOpacity: 1,
    strokeWidth: 1,
    arrowWidth: 5,
    fill: "#BCDEFA",
};




export default class MACD extends Component {

    render() {
        const { calculator } = this.props
        return (
            <>
                <YAxis axisAt="right" orient="right" ticks={3} />
                <MouseCoordinateY
                    at="right"
                    orient="right"
                    displayFormat={format(".2f")}
                    {...mouseEdgeAppearance}
                />
                <MACDSeries yAccessor={d => d.macd}
                    {...macdAppearance} />
                <MACDTooltip
                    origin={[0, 15]}
                    yAccessor={d => d.macd}
                    options={calculator.options()}
                    appearance={macdAppearance}
                    onClick={(e)=>console.log(e)}
                />
                {this.props.children}
            </>
        )
    }


}