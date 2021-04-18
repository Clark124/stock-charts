
import React from 'react';

import lodash from 'lodash'
import Chart from './components/example/Main'

import { getKline, lastKline, getQuote } from './service/traderoom.js'
import { changeNumber } from './utils/utils'
import SetIndicatorModal from './SetIndicatorModal'

import './App.css'

const options = {
	upColor: '#ff6060',     //K线颜色 涨
	downColor: '#2be594'  //K线颜色 跌
}

//指标列表
const indicateList = [
	{ title: 'MACD', value: 'macd', type: 'indicator', isChart: true, options: { fast: 12, slow: 26, signal: 9, sourcePath: "close" } },
	{ title: 'ATR', value: 'atr', type: 'indicator', isChart: true, options: { windowSize: 14 } },
	{ title: 'BOLL', value: 'bollingerBand', type: 'indicator', isChart: false, candleArea: true, options: { windowSize: 20, sourcePath: "close", multiplier: 2, movingAverageType: "sma" } },
	{ title: 'CCI', value: 'cci', type: 'indicator', isChart: true, options: { windowSize: 14 } ,},
	{ title: 'KeltnerChannel', value: 'keltnerChannel', type: 'indicator', isChart: false ,candleArea: true, options: { windowSize: 20, sourcePath: "close", multiplier: 2, movingAverageType: "sma" }},
	{ title: 'KDJ', value: 'kdj', type: 'indicator', isChart: true, options:{windowSize: 9,kWindowSize: 3,dWindowSize: 3,}},
	{ title: 'Elder Ray', value: 'elderRay', type: 'indicator', isChart: true },
	{ title: 'Force Index', value: 'forceIndex', type: 'indicator', isChart: true },
	{ title: 'MA', value: 'ma', type: 'ma', options: { windowSize: 10, sourcePath: "close" } },
	{ title: 'EMA', value: 'ema', type: 'ma', isChart: false },
	{ title: 'SMA', value: 'sma', type: 'ma', isChart: false ,options: { windowSize: 10, sourcePath: "close" }},
	{ title: 'TMA', value: 'tma', type: 'ma', isChart: false },
	{ title: 'WMA', value: 'wma', type: 'ma', isChart: false },
	{ title: 'RSI', value: 'rsi', type: 'indicator', isChart: true ,options:{windowSize: 14,sourcePath: "close"}},
	{ title: 'SAR', value: 'sar', type: 'indicator', isChart: false },
	{ title: 'Stochastic', value: 'stochasticOscillator', type: 'indicator', isChart: true },
	{ title: 'Vol Profile', value: 'volumeProfile', type: 'indicator', isChart: false },
]

//默认指标
const defaultIndicator = [
	{ title: 'VOL', value: 'vol', type: 'indicator', isChart: true },
]

//默认均线
const defaultMA = [
	{ title: 'MA', value: 'ma', type: 'ma', options: { windowSize: 5, sourcePath: "close" } },
	{ title: 'MA', value: 'ma', type: 'ma', options: { windowSize: 10, sourcePath: "close" } },
	{ title: 'MA', value: 'ma', type: 'ma', options: { windowSize: 20, sourcePath: "close" } },
]


class ChartComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			stockCode: '000651.SZ',  //股票代码
			data: [],  //
			quote: {
				prod_code: "--",
				prod_name: "--",
				last_px: '--',
				px_change_rate: '--'
			},  //行情
			periodName: ['分时', '5分钟', '15分钟', '30分钟', '60分钟', '日K', '周K', '月K'],
			selectedIndicator: [],  //当前被选择中的指标

			period: 6,
			showPeriodList: false,
			showIndicatorList: false,
			indicatorParam: {},
			visible: false

		}
	}

	UNSAFE_componentWillMount() {
		let chartSetting = localStorage.getItem('chartSetting')
		if (chartSetting) {
			this.setState({ selectedIndicator: JSON.parse(chartSetting) })
		} else {
			this.setState({ selectedIndicator: [...defaultIndicator, ...defaultMA] })
		}
	}

	componentDidMount() {
		const { stockCode } = this.state

		this.onGetKline(stockCode)
		this.onGetQuote(stockCode)
		// setInterval(()=>{
		// 	this.onGetLastKline(stockCode)
		// 	this.onGetQuote(stockCode)
		// },3000)

	}
	onGetKline(code) {
		const { period } = this.state
		const data = {
			prod_code: code,
			period
		}
		getKline(data).then(res => {
			let data = res.data.candle[code]
			data = changeNumber(data, 2)
			
			const signalBuy = {key:'buyOpen',value:0}
			const signalSell = {key:'buyFlat',value:0}
			data[290].signal = signalBuy
			data[298].signal = signalSell
			// console.log(data)
			this.setState({ data })
		})
	}
	onGetQuote(code) {
		getQuote({ prod_code: code, }).then(res => {
			let ret = {}
			if (res.data) {
				ret = res.data[0]
			} else if (res[0]) {
				ret = res[0]
			}
			this.setState({ quote: { ...ret } })
		})
	}
	onGetLastKline(code) {
		const data = {
			prod_code: code,
			period: 6
		}
		lastKline(data).then(res => {
			let value = res.data.candle[code]
			const { data } = this.state
			const dataLen = data.length
			if (value && value.length > 0) {
				value = changeNumber(value, 2)
				const len = value.length
				value = value[len - 1]

				if (data[dataLen - 1].date.toLocaleString() === value.date.toLocaleString()) {
					data[dataLen - 1] = { ...data[dataLen - 1], ...value }
				} else if (value.date > data[dataLen - 1].date) {
					data.push(value)
				}
				this.setState({ data })

			}
		})
	}


	//切换周期
	onChangePeroid(index) {
		const { stockCode } = this.state
		this.setState({ period: index + 1, showPeriodList: false }, () => {
			this.onGetKline(stockCode)
		})
	}

	//添加指标
	onAddIndicator(e) {
		this.setState({ showIndicatorList: false })
		let { selectedIndicator } = this.state

		//如果是只表上只能显示一个的
		if (indicateList[e].candleArea) {
			//判断是否是重复点击取消当前
			let isCancle = false
			selectedIndicator.forEach((item, index) => {
				if (item.value === indicateList[e].value) {
					isCancle = true
					selectedIndicator.splice(index, 1)
				}
			})
			if (!isCancle) {
				selectedIndicator = selectedIndicator.filter(item => !item.candleArea)
				const newIndicator = lodash.cloneDeep(indicateList[e])
				selectedIndicator.push(newIndicator)
			}
		} else {
			const newIndicator = lodash.cloneDeep(indicateList[e])
			selectedIndicator.push(newIndicator)
		}
		this.setState({ selectedIndicator }, () => {
			this.saveChart()
		})
	}

	//本地保存已选指标
	saveChart() {
		const { selectedIndicator } = this.state
		localStorage.setItem('chartSetting', JSON.stringify(selectedIndicator))
	}

	//显示修改指标弹框
	setIndcatorParameter(index) {
		const { selectedIndicator } = this.state
		console.log(selectedIndicator[index])
		this.setState({ indicatorParam: selectedIndicator[index] })
	}

	//删除指标
	removeIndicator(index) {
		const { selectedIndicator } = this.state
		selectedIndicator.splice(index,1)
		this.setState({selectedIndicator,indicatorParam: {}},()=>{
			this.saveChart()
		})
	}

	//修改指标参数
	changeIndicatorParam(index,options){
		let { selectedIndicator } = this.state 
		selectedIndicator[index].options = options
		this.setState({selectedIndicator,indicatorParam: {}},()=>{
			this.saveChart()
		})
	}


	render() {
		let { quote, period, periodName, showPeriodList, showIndicatorList, selectedIndicator, indicatorParam } = this.state
		const { upColor, downColor } = options
		selectedIndicator.forEach((item, index) => item.indicatorId = index)

		return (
			<div className="stock-chart-wrapper">
				<div className="chart-title">
					<div className="quote-wrapper">
						<span className="code-name">{quote.prod_name}({quote.prod_code})</span>
						<span className="code-price" style={{ color: quote.px_change_rate >= 0 ? upColor : downColor }}>{quote.last_px}</span>
						<span className="change-rate" style={{ color: quote.px_change_rate >= 0 ? upColor : downColor }}>{quote.px_change_rate}%</span>
					</div>
					<div className="select-right">
						{/* 选择周期 */}
						<span className="select-period">
							<span className={showPeriodList ? "current-period active" : "current-period"} onClick={() => this.setState({ showPeriodList: !this.state.showPeriodList })}>{periodName[period - 1]}</span>
							{showPeriodList ? <div className="period-list">
								{periodName.map((item, index) => {
									return (
										<div className="period-item" key={item} onClick={this.onChangePeroid.bind(this, index)}>
											{item}
										</div>
									)
								})}
							</div> : null}
						</span>
						{/* 选择指标 */}
						<span className="select-indicator">
							<span className={showIndicatorList ? "current-period active" : "current-period"} onClick={() => this.setState({ showIndicatorList: !this.state.showIndicatorList })}>添加指标</span>
							{showIndicatorList ? <div className="indicator-list">
								{indicateList.map((item, index) => {
									return (
										<div className="indicator-item" key={item.value} onClick={this.onAddIndicator.bind(this, index)} >
											{item.title}
										</div>
									)
								})}
							</div> : null}
						</span>
					</div>
				</div>

				{this.state.data.length > 0 ?
					<Chart
						data={this.state.data}
						options={options}
						period={period}
						height={600}
						selectedIndicator={selectedIndicator}
						setIndcatorParameter={this.setIndcatorParameter.bind(this)}
					/> :

					<div>无数据</div>
				}
				{indicatorParam.value ? <SetIndicatorModal
					indicatorParam={indicatorParam}
					closeModal={() => this.setState({ indicatorParam: {} })}
					removeIndicator={this.removeIndicator.bind(this)}
					changeIndicatorParam={this.changeIndicatorParam.bind(this)}
				/> : null}

			</div>

		)
	}
}


export default ChartComponent;
