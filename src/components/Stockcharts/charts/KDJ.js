import { YAxis } from "../lib/axes";
import { MouseCoordinateY, } from "../lib/coordinates";
import { KDJSeries } from "../lib/series";
import { KdjTooltip } from "../lib/tooltip";
import { format } from "d3-format";

const mouseEdgeAppearance = {
    textFill: "#542605",
    stroke: "#FFFFFF",
    strokeOpacity: 1,
    strokeWidth: 1,
    arrowWidth: 5,
    fill: "#BCDEFA",
};

const kdjAppearance = {
    stroke: Object.assign({}, KDJSeries.defaultProps.stroke)
};

export default function KDJ(props) {
    const { calculator,indicatorId } = props
    return (
        <>
            <YAxis axisAt="right" orient="right" ticks={3} />
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
                {...mouseEdgeAppearance}
            />

            <KDJSeries yAccessor={d => d['kdj'+indicatorId]} />
            <KdjTooltip
                yAccessor={d => d['kdj'+indicatorId]}
                origin={[0, 15]}
                appearance={{
                    ...kdjAppearance
                }}
                options={calculator.options()}
                onClick={()=>props.setIndcatorParameter(indicatorId)}
            />
            {props.children}
        </>
    )
}