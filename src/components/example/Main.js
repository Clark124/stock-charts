import React from "react";
import PropTypes from "prop-types";

import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "../Stockcharts";
import { Annotate ,buyPath,SvgPathAnnotation_1} from "../Stockcharts/lib/annotation";
import { XAxis } from "../Stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
} from "../Stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "../Stockcharts/lib/scale";
import { MovingAverageTooltip, } from "../Stockcharts/lib/tooltip";
import { fitWidth } from "../Stockcharts/lib/helper";
// import { formatNumber } from '../Stockcharts/lib/utils/index'
// import { last } from "../Stockcharts/lib/utils";
import { ma, macd, sma, atr, cci, kdj, bollingerBand ,keltnerChannel,rsi} from "../Stockcharts/lib/indicator";  //用于计算
import { MACD, Vol, MovingAverage, CandleChart, ATR, CCI, KDJ, BollingerBand,KeltnerChannel,RSI } from '../Stockcharts/charts/index'  //指标图形


const IndicatorList = {
	ma, macd, sma, atr, cci, kdj, bollingerBand,keltnerChannel,rsi
}

const ChartComponent = {
	macd: MACD,
	vol: Vol,
	atr: ATR,
	cci: CCI,
	kdj: KDJ,
	bollingerBand: BollingerBand,
	keltnerChannel:KeltnerChannel,
	rsi:RSI
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
		let { type, data: initialData, width, ratio, period, height, selectedIndicator } = this.props;

		let indicatorcharts = selectedIndicator.filter(item => item.isChart)   //指标图标
		const movingAverage = selectedIndicator.filter(item => item.type === 'ma')   //均线
		const candleArea = selectedIndicator.filter(item => item.candleArea)  //K线图区域图
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
		movingAverage.forEach((item, index) => {
			if (IndicatorList[item.value]) {
				let indicator = IndicatorList[item.value]
				let calculator = indicator().id(index).options(item.options).merge((d, c) => { d[item.value + item.options.windowSize] = c }).accessor(d => d[item.value + item.options.windowSize])
				calculatedData = calculator(calculatedData)
				item.calculator = calculator
			}

		})

		const movingAverageTooltipOption = movingAverage.map(item => {
			return {
				yAccessor: item.calculator.accessor(),
				type: item.value,
				stroke: item.calculator.stroke(),
				windowSize: item.calculator.options().windowSize,
				indicatorId: item.indicatorId
			}
		})

		candleArea.forEach((item, index) => {
			if (IndicatorList[item.value]) {
				let indicator = IndicatorList[item.value]
				let calculator = indicator().options(item.options ? item.options : {}).merge((d, c) => { d[item.value] = c }).accessor(d => d[item.value])
				calculatedData = calculator(calculatedData)
				item.calculator = calculator
			}
		})

		indicatorcharts.forEach((item, index) => {
			//指标原点返回值
			item.origin = (w, h) => [0, h - (indicatorChartNum - index) * indicatorChartHeight]
			item.timeFormatForPeriod = timeFormatForPeriod
			item.indicatorChartHeight = indicatorChartHeight

			//配置图标
			if (item.value === 'vol') {
				item.yExtents = d => d.volume
				item.padding = { top: 10, bottom: 0 }
			} else if (item.value === 'macd'||item.value === 'atr' || item.value === 'cci' || item.value === 'kdj'||item.value === 'rsi') {
				item.yExtents = d => d[item.value+item.indicatorId]
				item.padding = { top: 10, bottom: 10 }
			}


			let calculator
			if (IndicatorList[item.value]) {
				let indicator = IndicatorList[item.value]

				calculator = indicator().options(item.options ? item.options : {}).merge((d, c) => { d[item.value+item.indicatorId] = c }).accessor(d => d[item.value+item.indicatorId])
				calculatedData = calculator(calculatedData)
			}
			item.calculator = calculator

		})

		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
		const { data, xScale, xAccessor, displayXAccessor, } = xScaleProvider(calculatedData);
	
		//截取最近150根线
		const start = data.length + 10
		let end = 0
		if (data.length > 150) {
			end = data.length - 150
		}
		const xExtents = [start, end];

		const annotationProps = {
			path: buyPath,
			y: ({ yScale, datum, d }) => {
				return datum.signal && (datum.signal['key'].includes('buy') ? yScale(datum.low) + 20 + 28 * datum.signal.value : yScale(datum.high) - 20 - 28 * datum.signal.value)
			},
			fill: d => {
				if (d.signal) {
					return d.signal.key === 'sell' ? '#ff6060' : d.signal.key.includes("sell") ? '#2be594' : '#ff6060'
				} else {
					return '#000000'
				}
			},
			tooltip: d => {
				// console.log(d)
				if (d.signal !== undefined) {
					let str = '';
					switch (d.signal.key) {
						case 'buyOpen': str = "买开"; break;
						case 'sellOpen': str = "卖开"; break;
						case 'sellFlat': str = "卖平"; break;
						case 'buyFlat': str = "买平"; break;
						case 'buy': str = "买"; break;
						case 'sell': str = "卖"; break;
						default: ;
					}
					return str;
				}
			},
		};


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
					<CandleChart />

					{candleArea.map((item, index) => {
						const Component = ChartComponent[item.value]
						return (
							<Component {...item} key={index} setIndcatorParameter={(id) => this.props.setIndcatorParameter(id)}/>
						)
					})}


					{movingAverage.map((item, index) => {
						return (
							<MovingAverage {...item} key={index} selectedIndex={index} />
						)
					})}

					<MovingAverageTooltip
						onClick={e => this.props.setIndcatorParameter(e.indicatorId)}
						origin={[0, 15]}
						textFill={'#AAAAAA'}
						options={movingAverageTooltipOption}
					/>

					{/* <Annotate with={SvgPathAnnotation_1}
						when={d => d.signal}
						usingProps={annotationProps} /> */}


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
							<Component {...item} setIndcatorParameter={(id) => this.props.setIndcatorParameter(id)}>
								{indicatorcharts.length === index + 1 ?
									<>
										<XAxis axisAt="bottom" orient="bottom" />
										<MouseCoordinateX
											at="bottom"
											orient="bottom"
											displayFormat={timeFormat(timeFormatForPeriod)}
											rectRadius={5}
											{...mouseEdgeAppearance}
										/>
									</> : <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} stroke={'#333333'} />


								}
							</Component>
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