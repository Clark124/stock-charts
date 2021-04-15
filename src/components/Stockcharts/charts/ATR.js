import { YAxis } from "../lib/axes";
import { MouseCoordinateY, } from "../lib/coordinates";
import { LineSeries } from "../lib/series";
import { SingleValueTooltip } from "../lib/tooltip";
import { format } from "d3-format";

const mouseEdgeAppearance = {
    textFill: "#542605",
    stroke: "#FFFFFF",
    strokeOpacity: 1,
    strokeWidth: 1,
    arrowWidth: 5,
    fill: "#BCDEFA",
};

export default function ATR(props) {
    const {calculator} = props
    return (
        <>
            <YAxis axisAt="right" orient="right" ticks={3} />
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
                {...mouseEdgeAppearance}
            />

            <LineSeries yAccessor={d => d.atr}/>
            <SingleValueTooltip
                yAccessor={d => d.atr}
                origin={[0, 15]}
                yLabel={`ATR(${calculator.options().windowSize})`}
                valueFill={'#AAAAAA'}
            />
            {props.children}
        </>
    )
}