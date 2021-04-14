import { Chart } from "../Stockcharts";
import { MACDSeries, } from "../Stockcharts/lib/series";
import { XAxis, YAxis } from "../Stockcharts/lib/axes";
import { macd } from "../Stockcharts/lib/indicator";
import { MouseCoordinateX, MouseCoordinateY, } from "../Stockcharts/lib/coordinates";
import { MACDTooltip } from "../Stockcharts/lib/tooltip";
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


export default function Test(props) {
    const { timeFormatForPeriod, indicatorChartHeight, calculator, origin } = props
    return (
        <Chart
            id={2}
            height={indicatorChartHeight}
            yExtents={(d) => d.macd}
            origin={origin}
            padding={{ top: 10, bottom: 10 }}
        >
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="right" orient="right" ticks={3} />

            <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat(timeFormatForPeriod)}
                rectRadius={5}
                {...mouseEdgeAppearance}
            />
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
        </Chart>
    )
}