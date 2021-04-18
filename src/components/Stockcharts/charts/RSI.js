import { YAxis } from "../lib/axes";
import { MouseCoordinateY, } from "../lib/coordinates";
import { RSISeries } from "../lib/series";
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

export default function RSI(props) {
    const {calculator,indicatorId} = props
    return (
        <>
            <YAxis axisAt="right" orient="right"   tickValues={[30, 50, 70]}/>
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
                {...mouseEdgeAppearance}
            />

            <RSISeries yAccessor={d => d['rsi'+indicatorId]}/>
            <SingleValueTooltip
                yAccessor={d => d['rsi'+indicatorId]}
                origin={[0, 15]}
                yLabel={`RSI(${calculator.options().windowSize})`}
                valueFill={'#AAAAAA'}
                onClick={()=>props.setIndcatorParameter(indicatorId)}
            />
            {props.children}
        </>
    )
}