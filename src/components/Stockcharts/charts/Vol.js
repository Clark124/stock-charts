import { formatNumber } from '../lib/utils/index'
import { YAxis } from "../lib/axes";
import { MouseCoordinateY, } from "../lib/coordinates";
import { BarSeries } from "../lib/series";

const mouseEdgeAppearance = {
    textFill: "#542605",
    stroke: "#FFFFFF",
    strokeOpacity: 1,
    strokeWidth: 1,
    arrowWidth: 5,
    fill: "#BCDEFA",
};

const color = {
	upColor: '#ff6060',     //K线颜色 涨
	downColor: '#2be594'  //K线颜色 跌
}


export default function Vol(props) {
    return (
        <>
            <YAxis axisAt="right" orient="right" ticks={3} tickFormat={formatNumber} />
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={formatNumber}
                {...mouseEdgeAppearance}
            />

            <BarSeries
                yAccessor={d => d.volume}
                fill={d => d.close > d.open ? color.upColor : color.downColor}
                opacity={0.7}
            />

        </>
    )
}