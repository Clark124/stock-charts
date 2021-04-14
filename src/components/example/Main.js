import React from "react";
import PropTypes from "prop-types";


import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "../Stockcharts";
import {
	BarSeries,
	// AreaRangeSeries,
	CandlestickSeries,
	LineSeries,
	MACDSeries,
} from "../Stockcharts/lib/series";
import { XAxis, YAxis } from "../Stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "../Stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "../Stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, MACDTooltip, } from "../Stockcharts/lib/tooltip";
import { fitWidth } from "../Stockcharts/lib/helper";
import { formatNumber } from '../Stockcharts/lib/utils/index'
// import { last } from "../Stockcharts/lib/utils";
import { ma, macd, sma } from "../Stockcharts/lib/indicator";
import { MACD, Vol,MovingAverage } from '../Stockcharts/charts/index'


const IndicatorList = {
	ma, macd, sma
}
const ChartComponent = {
	macd: MACD,
	vol: Vol
}

const mouseEdgeAppearance = {
    textFill: "#542605",
    stroke: "#FFFFFF",
    strokeOpacity: 1,
    strokeWidth: 1,
    arrowWidth: 5,
    fill: "#BCDEFA",
};


// const areaRegion = [90, 150]



class MainCharts extends React.Component {
	render() {
		let { type, data: initialData, width, ratio, options, period, height, selectedIndicator } = this.props;

		let indicatorcharts = selectedIndicator.filter(item => item.isChart)   //指标图标
		const movingAverage = selectedIndicator.filter(item => item.type==='ma')   //均线
		// console.log(movingAverage)
		//计算各个图标高度
		const indicatorChartNum = indicatorcharts.length     
	
		const candleChartHeight = (height - 50) / 3 * 2.5 - indicatorChartNum * 40
		const indicatorChartHeight = (height - 50 - candleChartHeight) / indicatorChartNum


		//时间格式化
		let timeFormatForPeriod
		if (period < 6) {
			timeFormatForPeriod = '%Y-%m-%d %-H:%M'
		} else {
			timeFormatForPeriod = '%Y-%m-%d'
		}


		let calculatedData = initialData;


		movingAverage.forEach((item,index)=>{
			if (IndicatorList[item.value]) {
				let indicator = IndicatorList[item.value]
				let calculator = indicator().id(index).options(item.options?item.options:{}).merge((d, c) => { d[item.title] = c }).accessor(d => d[item.title])
				calculatedData = calculator(calculatedData)
				item.calculator = calculator
			}
			
		})


		const movingAverageTooltipOption = movingAverage.map(item=>{
			return {
				yAccessor: item.calculator.accessor(),
				type: item.value,
				stroke: item.calculator.stroke(),
				windowSize: item.calculator.options().windowSize,
			}
		})

		
		
		
		
		indicatorcharts.forEach((item, index) => {
	
			// console.log(height)
			//指标原点返回值
			item.origin = (w,h)=>[0, h - (indicatorChartNum - index) * indicatorChartHeight]
		
			item.timeFormatForPeriod = timeFormatForPeriod
			item.indicatorChartHeight = indicatorChartHeight

			//配置图标
			if (item.value === 'vol') {
				item.yExtents = d => d.volume
				item.padding = { top: 10, bottom: 0 }
			} else if (item.value === 'macd') {
				item.yExtents = d => d.macd
				item.padding = { top: 10, bottom: 10 }
			}


			let calculator
			if (IndicatorList[item.value]) {
				let indicator = IndicatorList[item.value]

				calculator = indicator().options(item.options?item.options:{}).merge((d, c) => { d[item.value] = c }).accessor(d => d[item.value])
				calculatedData = calculator(calculatedData)
			}
			item.calculator = calculator
	
		})
		

		


		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);

		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);
		
		//截取最近150根线
		const start = data.length + 10
		let end = 0
		if (data.length > 150) {
			end = data.length - 150
		}
		const xExtents = [start, end];

		return (
			<ChartCanvas height={height}
				width={width}
				ratio={ratio}
				margin={{ left: 10, right: 70, top: 20, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}>
				
				<Chart id={1} height={candleChartHeight}
					yExtents={[d => [d.high, d.low]]}
					padding={{ top: 50, bottom: 20 }}
				>
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
						fill={d => d.close > d.open ? options.upColor : options.downColor}
						stroke={d => d.close > d.open ? options.upColor : options.downColor}
						wickStroke={d => d.close > d.open ? options.upColor : options.downColor}
						opacity={0.7}
					/>

					{movingAverage.map((item,index)=>{
						return (
							<MovingAverage {...item} key={index}/>
						)
					})}

					<MovingAverageTooltip
						onClick={e => console.log(e)}
						origin={[0, 15]}
						textFill={'#AAAAAA'}
						options={movingAverageTooltipOption}
					/>

					{/* Y轴最后的显示 */}
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close}
						fill={d => d.close > d.open ? options.upColor : options.downColor}
						stroke={d => d.close > d.open ? options.upColor : options.downColor}
						textFill={d => d.close > d.open ? "#fff" : "#fff"}
						strokeOpacity={1}
						strokeWidth={3}
						arrowWidth={2}
					/>

					{/* 时间 高开低收 成交量 */}
					<OHLCTooltip origin={[0, 0]} textFill={'#999'} />
				</Chart>

				{indicatorcharts.map((item, index) => {
					const Component = ChartComponent[item.value]
					return (
						<Chart
							id={index + 2}
							origin={item.origin}
							height={item.indicatorChartHeight}
							yExtents={item.yExtents}
							padding={item.padding}
							key={index + 2}
						>
							<Component {...item} />
						</Chart>
					)
				})}


				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

MainCharts.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
	period: PropTypes.number.isRequired,  //周期
};

MainCharts.defaultProps = {
	type: "hybrid",
};

MainCharts = fitWidth(MainCharts);

export default MainCharts;