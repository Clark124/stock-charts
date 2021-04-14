export const typeOptions = [
  {label: '股票', value: 'stk'},
  {label: '期货', value: 'fut'},
  // {label: '外汇', value: 'cash'}
]

export const messageOptions = [
  {label: '系统消息', value: 'system'},
  {label: '微信通知', value: 'weixin'}
]

export const period = [
  {label: '1分钟', value: 1},
  {label: '5分钟', value: 2},
  {label: '15分钟', value: 3},
  {label: '30分钟', value: 4},
  {label: '60分钟', value: 5},
  {label: '1天', value: 6},
  {label: '1周', value: 7},
  {label: '1月', value: 8}
]

export const costArray=[
  {label:'万分之五',value:0.0005},
  {label:'万分之八',value:0.0008},
  {label:'千分之一',value:0.001},
  {label:'千分之一点五',value:0.015},
]

export const combinationOptions = [
  {label: '大盘', value: '大盘'},
  {label: '小盘', value: '小盘'},
  {label: '次新', value: '次新'},
  {label: '价值', value: '价值'},
  {label: '成长', value: '成长'},
  {label: '择时', value: '择时'},
  {label: '趋势', value: '趋势'}
]

export const combinationTabs = [
  {
    label: '实盘年化',
    value: 'year_yield_rate'
  },
  {
    label: '实盘收益',
    value: 'total_yield_rate'
  },
  {
    label: '一季收益',
    value: ''
  },
  {
    label: '近一月收益',
    value: 'month_yield_rate'
  },
  {
    label: '今日收益',
    value: 'day_yield_rate'
  },
  {
    label: '历史最大回撤',
    value: 'retracement'
  },
  {
    label: '上架日期',
    value: 'gmt_create'
  }
]

export const benchmark=[
  {label: '沪深300指数', value: '沪深300指数'},
  // {label: '上证50指数', value: '上证50指数'},
  // {label: '上证指数', value: '上证指数'},
  // {label: '创业板指数', value: '创业板指数'},
]
export const executionPeriod=[
  {label:'15分钟',value:15},
  {label:'30分钟',value:30},
  {label:'1小时',value:60},
  {label:'1天',value:720},
]

export const executionTime=[
  {label:'9:30',value:'9:30'},
  {label:'9:45',value:'9:45'},
  {label:'10:00',value:'10:00'},
  {label:'10:30',value:'10:30'},
  {label:'11:00',value:'11:00'},
  {label:'13:30',value:'13:30'},
  {label:'14:00',value:'14:00'},
  {label:'14:30',value:'14:30'},
  {label:'14:45',value:'14:45'},
  {label:'K线结束时',value:'K线结束时'}
]


//智能选股结果参数对应
export const chineseToTng={
  净资产收益率:'roe',
  每股净资产:'naps',
  资产负债率:'assetsLiabilities',
  基本每股收益:'basicEps',
  净利率:'netProfitRatio',
  毛利率:'grossProfitRate',
  每股收益同比增长率:'stockSameRate',
  净利润同比增长率:'netSameRate',
  营业收入同比增长率:'orSameRate',
  股息率:'dividendYield',
  每股经营现金流:'stockMoneyFlow',
  存货周转率:'inventoryTurnoverRatio',
  每股收益:'earningsPerShare',
  净利润3年复合增长率:'netProfit3y',
  连续3年净资产收益率:'returnOnAssets3y',
  静态市盈率:'pe',
  动态市盈率:'dynPe',
  市净率:'pb',
  市销率:'ps',
  PEG:'peg',
  市现率:'theCityRate',
  流通市值:'circulationMarketValue',
  总市值:'totalMarketValue',
  流通股本:'circulatingCapital',
  总股本:'totalShares',
  前十大流通股东持股比例合计:'flowShareholdingRatioTop10',
  前十大股东持股比例合计:'shareholdingRatioTop10',
  上市时间:'issueDate',
  上市时长:'issueDay',
  派现融资比:'ponus',
  外资持股数量:'foreignCapitalSharehdNum',
  外资持股占比:'foreignCapitalSharehdPct',
  外资持股数量变化:'foreignCapitalSharehdNumchange',
  外资持股占比变化:'foreignCapitalSharehdPctchange',
  主力净流入率:'inFlowRate',
  融资余额:'finBalance',
  盈利比率:'profitRatio',
  平均成本:'averageCost',
  平均成本比率:'averageCostRatio',
  日振幅:'amplitude',
  量比:'volRatio',
  '5日换手率':'turnover5Ratio',
  日换手率:'turnoverRatio',
  日涨跌幅:'px_change_rate',
  '5日涨跌幅':'day5_chgpct',
  '20日涨跌幅':'day20_chgpct',
  '60日涨跌幅':'day60_chgpct',
  '年涨幅':'year_up_rate',
  '年跌幅':'year_down_rate',
  '创历史新高':'history_new_height',
  '创历史新低':'history_new_low',
  连涨天数:'serial_up_day',
  连跌天数:'serial_down_day',
  贝塔值:'beta',
}

//智能选股参数
export const rangeData={
  '净资产收益率':{
    content:[
      {name:'一般(10%以内)',value:'<10'},
      {name:'平均(10%~15%)',value:'10-15'},
      {name:'好(15%~20%)',value:'15-20'},
      {name:'优秀(20%以上)',value:'>20'},
    ],
    flag:'%'
  },
  '净利率':{
    content:[
      {name:'低(5%以内)',value:'<5'},
      {name:'一般(5%~10%)',value:'5-10'},
      {name:'好(10%~20%)',value:'10-20'},
      {name:'优秀(30%以上)',value:'>30'},
    ],
    flag:'%'
  },
  '毛利率':{
    content:[
      {name:'低(10%以内)',value:'<10'},
      {name:'一般(10%~ 30%)',value:'10-30'},
      {name:'好(30%~ 60%)',value:'30-60'},
      {name:'优秀(60%以上)',value:'>60'},
    ],
    flag:'%'
  },
  '每股收益同比增长率':{
    content:[
      {name:'低(0以内)',value:'<0'},
      {name:'一般(0%~ 5%)',value:'0-5'},
      {name:'好(5%~ 20%)',value:'5-20'},
      {name:'优秀(20%以上)',value:'>20'},
    ],
    flag:'%'
  },
  '净利润同比增长率':{
    content:[
      {name:'低(0以内)',value:'<0'},
      {name:'一般(0%~ 5%)',value:'0-5'},
      {name:'好(5%~ 20%)',value:'5-20'},
      {name:'优秀(20%以上)',value:'>20'},
    ],
    flag:'%'
  },
  '营业收入同比增长率':{
    content:[
      {name:'低(0以内)',value:'<0'},
      {name:'一般(0%~ 5%)',value:'0-5'},
      {name:'好(5%~ 20%)',value:'5-20'},
      {name:'优秀(20%以上)',value:'>20'},
    ],
    flag:'%'
  },
  '资产负债率':{
    content:[
      {name:'10%及以下',value:'<10'},
      {name:'10%~30',value:'10-30'},
      {name:'30%~ 50%',value:'30-50'},
      {name:'50%以上',value:'>50'},
    ],
    flag:'%'
  },
  '股息率':{
    content:[
      {name:'无分红(=0%)',value:'=0'},
      {name:'有分红(>0%)',value:'>0'},
      {name:'低分红(0~2%)',value:'0-2'},
      {name:'中分红(2~5%)',value:'2-5'},
      {name:'高分红(>5%)',value:'>5'},
    ],
    flag:'%'
  },
  '每股经营现金流':{
    content:[
      {name:'小于0元',value:'<0'},
      {name:'0-0.3元',value:'0-0.3'},
      {name:'0.3-0.5元',value:'0.3-0.5'},
      {name:'大于0.5元',value:'>0.5'},
    ]
  },
  '存货周转率':{
    content:[
      {name:'很低(<0.3)',value:'<0.3'},
      {name:'低(0.3~0.7)',value:'0.3-0.7'},
      {name:'中(0.7~2)',value:'0.7-2'},
      {name:'高(2~4)',value:'2-4'},
      {name:'很高(4~8)',value:'4-8'},
      {name:'极高(>8)',value:'>8'},
    ]
  },
  '每股收益':{
    content:[
      {name:'小于0元',value:'<0'},
      {name:'0元~0.3 元',value:'0-0.3'},
      {name:'0.3元~0.5元',value:'0.3-0.5'},
      {name:'0.5元~1元',value:'0.5-1'},
      {name:'1元以上',value:'>1'},
    ]
  },
  '每股净资产':{
    content:[
      {name:'0元~1元',value:'0-1'},
      {name:'1元~3元',value:'1-3'},
      {name:'3元~5元',value:'3-5'},
      {name:'5元以上',value:'>5'},
    ]
  },
  '净利润3年复合增长率':{
    content:[
      {name:'低(0以内)',value:'<0'},
      {name:'一般(0%~ 5%)',value:'0-5'},
      {name:'好(5%~ 20%)',value:'5-20'},
      {name:'优秀(20%以上)',value:'>20'},
    ],
    flag:'%'
  },
  '连续3年净资产收益率':{
    content:[
      {name:'一般(10%以内)',value:'<10'},
      {name:'平均(10%~15%)',value:'10-15'},
      {name:'好(15%~20%)',value:'15-20'},
      {name:'优秀(20%以上)',value:'>20'},
    ],
    flag:'%'
  },
  '市盈率(静态)':{
    content:[
      {name:'高估(20以上)',value:'>20'},
      {name:'一般(15~20)',value:'15-20'},
      {name:'合理(10~15)',value:'10-15'},
      {name:'低估(10以内)',value:'<10'},
    ]
  },
  '市盈率(动态)':{
    content:[
      {name:'高估(20以上)',value:'>20'},
      {name:'一般(15~20)',value:'15-20'},
      {name:'合理(10~15)',value:'10-15'},
      {name:'低估(10以内)',value:'<10'},
    ]
  },
  '市净率':{
    content:[
      {name:'破净(1以下)',value:'<1'},
      {name:'较低(1~2)',value:'1-2'},
      {name:'合理(2~4)',value:'2-4'},
      {name:'高估(4以上)',value:'>4'},
    ]
  },
  '市现率':{
    content:[
      {name:'1倍以下',value:'<1'},
      {name:'3倍~5倍',value:'3-5'},
      {name:'5倍~10倍',value:'5-10'},
      {name:'10倍~20倍',value:'10-20'},
      {name:'20倍以上',value:'>20'},
    ]
  },
  '市销率':{
    content:[
      {name:'1倍以下',value:'<1'},
      {name:'3倍~5倍',value:'3-5'},
      {name:'5倍~10倍',value:'5-10'},
      {name:'10倍~20倍',value:'10-20'},
      {name:'20倍以上',value:'>20'},
    ]
  },
  'PEG':{
    content:[
      {name:'很好(<0.5)',value:'<0.5'},
      {name:'好(0.5~1)',value:'0.5-1'},
      {name:'一般(1~2)',value:'1-2'},
      {name:'差(>2)',value:'>2'},
    ]
  },
  '日涨幅':{
    content:[
      {name:'小于5%',value:'<5'},
      {name:'5%-8%',value:'5-8'},
      {name:'大于8%',value:'>8'},
    ],
    flag:'%'
  },
  '日振幅':{
    content:[
      {name:'小于5%',value:'<5'},
      {name:'5%-10%',value:'5-10'},
      {name:'10%-15%',value:'10-15'},
      {name:'大于15%',value:'>15'},
    ],
    flag:'%'
  },
  '量比':{
    content:[
      {name:'小于1',value:'<1'},
      {name:'1-3',value:'1-3'},
      {name:'3-5',value:'3-5'},
      {name:'大于5',value:'>5'},
    ]
  },
  '日换手率':{
    content:[
      {name:'小于5%',value:'<5'},
      {name:'5%-20%',value:'5-20'},
      {name:'20%-50%',value:'20-50'},
      {name:'大于50%',value:'>50'},
    ],
    flag:'%'
  },
  '5日换手率':{
    content:[
      {name:'小于5%',value:'<5'},
      {name:'5%-20%',value:'5-20'},
      {name:'20%-50%',value:'20-50'},
      {name:'大于50%',value:'>50'},
    ],
    flag:'%'
  },
  '5日涨幅':{
    content:[
      {name:'小于5%',value:'<5'},
      {name:'5%-10%',value:'5-10'},
      {name:'15%-20%',value:'15-20'},
      {name:'大于20%',value:'>20'},
    ],
    flag:'%'
  },
  '20日涨幅':{
    content:[
      {name:'小于10%',value:'<10'},
      {name:'10%-20%',value:'10-20'},
      {name:'20%-50%',value:'20-50'},
      {name:'大于50%',value:'>50'},
    ],
    flag:'%'
  },
  '60日涨幅':{
    content:[
      {name:'小于10%',value:'<10'},
      {name:'10%-20%',value:'10-20'},
      {name:'20%-50%',value:'20-50'},
      {name:'大于50%',value:'>50'},
    ],
    flag:'%'
  },
  '年涨幅':{
    content:[
      {name:'小于10%',value:'<10'},
      {name:'10%-30%',value:'10-30'},
      {name:'30%-60%',value:'30-60'},
      {name:'大于60%',value:'>60'},
    ],
    flag:'%'
  },
  '年跌幅':{
    content:[
      {name:'小于10%',value:'<10'},
      {name:'10%-30%',value:'10-30'},
      {name:'30%-60%',value:'30-60'},
      {name:'大于60%',value:'>60'},
    ],
    flag:'%'
  },
  '连涨天数':{
    content:[
      {name:'3天及以上',value:'>3'},
      {name:'5天及以上',value:'>5'},
      {name:'10天及以上',value:'>10'},
      {name:'20天及以上',value:'>20'},
    ]
  },
  '连跌天数':{
    content:[
      {name:'3天及以上',value:'>3'},
      {name:'5天及以上',value:'>5'},
      {name:'10天及以上',value:'>10'},
      {name:'20天及以上',value:'>20'},
    ]
  },
  '贝塔值':{
    content:[
      {name:'小波动(小于0.8)',value:'<0.8'},
      {name:'平均波动(0.8~1.5)',value:'0.8-1.5'},
      {name:'高波动(1.5以上)',value:'>1.5'},
    ]
  },
  '流通市值':{
    content:[
      {name:'小于15亿',value:'<1500000000'},
      {name:'15亿~50亿',value:'1500000000-5000000000'},
      {name:'50亿~200亿',value:'5000000000-20000000000'},
      {name:'200亿以上',value:'>20000000000'},
    ],
    flag:'亿'
  },
  '总市值':{
    content:[
      {name:'小于25亿',value:'<2500000000'},
      {name:'25亿~50亿',value:'2500000000-5000000000'},
      {name:'50亿~200亿',value:'5000000000-20000000000'},
      {name:'200亿以上',value:'>20000000000'},
    ],
    flag:'亿'
  },
  '流通股本':{
    content:[
      {name:'小于0.5亿',value:'<50000000'},
      {name:'0.5亿~3亿',value:'50000000-300000000'},
      {name:'3亿~10亿',value:'300000000-1000000000'},
      {name:'10亿~50亿',value:'1000000000-50000000000'},
      {name:'大于50亿',value:'>5000000000'},
    ],
    flag:'亿'
  },
  '总股本':{
    content:[
      {name:'小于1亿',value:'<100000000'},
      {name:'1亿~5亿',value:'100000000-500000000'},
      {name:'5亿~10亿',value:'500000000-1000000000'},
      {name:'10~50亿',value:'1000000000-5000000000'},
      {name:'大于50亿',value:'>5000000000'},
    ],
    flag:'亿'
  },
  '前十大股东持股比例合计':{
    content:[
      {name:'5%及以上',value:'>5'},
      {name:'10%及以上',value:'>10'},
      {name:'15%及以上',value:'>15'},
      {name:'20%及以上',value:'>15'},
      {name:'30%及以上',value:'>30'},
    ],
    flag:'%'
  },
  '前十大流通股东持股比例合计':{
    content:[
      {name:'5%及以上',value:'>5'},
      {name:'10%及以上',value:'>10'},
      {name:'15%及以上',value:'>15'},
      {name:'20%及以上',value:'>15'},
      {name:'30%及以上',value:'>30'},
    ],
    flag:'%'
  },
}