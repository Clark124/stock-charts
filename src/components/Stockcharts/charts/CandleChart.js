
import { XAxis, YAxis } from "../lib/axes";
import { CandlestickSeries } from "../lib/series";
import { EdgeIndicator, MouseCoordinateY } from "../lib/coordinates";
import { OHLCTooltip } from "../lib/tooltip";
import { format } from "d3-format";

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


export default function CandleChart(props) {
    return (
        <>
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} stroke={'#333333'} />
            <YAxis axisAt="right" orient="right" ticks={5} />
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
                {...mouseEdgeAppearance}
            />
            {/* 蜡烛图 */}
            <CandlestickSeries
                fill={d => d.close > d.open ? color.upColor : color.downColor}
                stroke={d => d.close > d.open ? color.upColor : color.downColor}
                wickStroke={d => d.close > d.open ? color.upColor : color.downColor}
                opacity={0.7}
            />
            {/* Y轴最后的显示 */}
            <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                yAccessor={d => d.close}
                fill={d => d.close > d.open ? color.upColor : color.downColor}
                stroke={d => d.close > d.open ? color.upColor : color.downColor}
                textFill={d => d.close > d.open ? "#fff" : "#fff"}
                strokeOpacity={1}
                strokeWidth={3}
                arrowWidth={2}
            />

            {/* 时间 高开低收 成交量 */}
            <OHLCTooltip origin={[0, 0]} textFill={'#999'} />
        </>
    )
}