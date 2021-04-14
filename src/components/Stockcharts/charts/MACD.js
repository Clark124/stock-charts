import React, { Component } from 'react'
import { MACDSeries, } from "../lib/series";
import { XAxis, YAxis } from "../lib/axes";
import { MouseCoordinateX, MouseCoordinateY, } from "../lib/coordinates";
import { MACDTooltip } from "../lib/tooltip";
import { timeFormat } from "d3-time-format";
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
        const { timeFormatForPeriod, calculator } = this.props
        return (
            <>
                {/* <XAxis axisAt="bottom" orient="bottom" /> */}
                <YAxis axisAt="right" orient="right" ticks={3} />

                {/* <MouseCoordinateX
                    at="bottom"
                    orient="bottom"
                    displayFormat={timeFormat(timeFormatForPeriod)}
                    rectRadius={5}
                    {...mouseEdgeAppearance}
                /> */}
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
                />
            </>
        )
    }


}