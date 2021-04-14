import {
    get,
    post,
    host,
    ctp,
    // postData
} from '../utils/utils'
// const ctp = 'http://123.206.133.200:8080'
// const ctp = 'http://full.ezquant.cn'
const ctp1 = 'http://115.159.215.227:8088'



export function getKline(data) {
    return get(host + '/quote/internal/kline', data)
}

export function lastKline(data){
    return get(host + '/last/kline', data)
}

//查询股票代码的行情
export function getQuote(data) {
    return get(host + '/quote/real', data)
}

export function getQuote1(data) {
    return get(ctp + '/full/ctptrade/SubMarketBean?', data)
}

//期货历史记录
export function historyTrade(data) {
    return get(host + '/full/ctptrade/queryStrategyTradeInfoPair', data)
}
//股票历史记录 
// export function historyTradeStk(data){
//     return get(host + '/secu/tradeInfoPair', data)
// }
export function historyTradeStk(data){
    return get(host + '/full/ctptrade/queryStrategyTradeInfoPair', data)
}

//托管策略
export function mandatoryList(data) {
    return get(ctp1 + '/my/strategy/deploy/list', data)
}

//策略的运行，暂停
export function strategyRunStop(data){
    return post(host + '/strategy/release/update', data,true)
}

//取消托管
export function deleteDeploy(data){
    return get(host + '/my/strategy/deploy/delete', data)
}




//恒生ctp转
export function getCtpCode(data) {
    return get(`${host}/full/ctptrade/getctpcode`, data);
}

//查询期货行情
export function getFutQuote(data) {

    return get(ctp + '/full/ctptrade/SubMarketBean', data)
}

//查询合约详情
export function queryInstrument(data) {
    return get(ctp + '/full/ctptrade/queryInstrument', data);
}

//查询期货当前合约可买数量
export function queryOpenPosition(data){
    return get(ctp + '/full/ctptrade/queryCanOpenPosition', data);
}

//查询撤单列表
export function queryOrder(data) {
    return get(host + '/full/ctptrade/queryOrder', data);
}

//撤单
export function cancelOrder(data) {
    return get(host + '/full/ctptrade/orderaction', data);
}

//股票撤单
export function cancelOrderStk(data){
    return get(host + '/secu/withdrawenter', data);
}

//全部撤单
export function cancelOrderAll(data){
    return get(host + '/secu/withdrawenter/all', data);
}

//全部撤单期货
export function cancelOrderAllStk(data){
    return get(host + '/full/ctptrade/orderaction/all', data);
}

//持仓
export function queryPosition(data) {
    return get(`${host}/full/ctptrade/querySymbolPositionFund`, data);
}
//股票持仓
export function queryPosition1(data) {
    return get(`${host}/secu/stockpositionqry`, data);
}
// //股票全部持仓
// export function positionAllStk(data){
//     return get(`${host}/secu/stockpositionqry`, data);
// }

//期货持仓详情
export function queryPositionList(data){
    return get(`${host}/full/ctptrade/queryPositionDetail`, data);
}
//股票


//当前仓位明细
export function currentPositionList(data){
    return get(`${host}/full/ctptrade/queryStrategyAllPosition`, data);
}
//当前仓位详情
export function currentPositionDetail(data){
    return get(`${host}/full/ctptrade/queryStrategyAllPositionDetail`, data);
}


//运行策略
export function runStrategy(data) {
    return get(`${host}/quant/strategy/run`, data);
}
//运行策略执行日志
export function runStrategyLog(data){
    return get(`${host}/strategy/signal/log`, data);
}

//所有运行策略
export function allRunStrategy(data){
    return get(`${host}/quant/strategy/run/all`, data);
}

//收益率曲线
export function radioData(data){
    return get(`${host}/full/ctptrade/queryStrategyFundCurveDetail`, data);
}

//跟单策略
export function followStrategyList(data) {
    return get(`${host}/quant/strategy/follow/list`, data);
}

//最优策略
export function optimalStrategyList(data) {
    return get(`${host}/quant/strategy/optimal`, data);
}

//跟单
export function followOrder(data){
    return post(`${host}/quant/strategy/follow`, data,true);
}

//删除跟单
export function followOrderDelete(data){
    return get(`${host}/my/strategy/follow/delete`, data);
}

//修改跟单状态
export function followStatusUpdate(data){
    return post(`${host}/strategy/follow/update`, data,true);
}

//策略列表
export function strategyList(data) {
    return get(`${host}/quant/strategy/list`, data);
}





//托管
export function deployStrategy(data) {
    return post(`${host}/quant/strategy/deploy`, data, true);
}

//回撤
export function backtest(data){
    return post(`${host}/full/admin/quant/strategy/backtest`, data);
}

//市场查询

//股票市场查询
export function getStkMarketList(data){
    return post(`${host}/search/stk/list`, data);
}
//热门股票查询
export function getHotStockList(data){
    return get(`${host}/full/hot/stock/list`, data);
}

//期货市场查询
export function getFutMarketList(data){
    return post(`${host}/search/fut/list`, data);
}

//查询是否是自选
export function isFavor(data) {
    return get(`${host}/user/optional/stockpool/exist/list`, data);
}

//添加自选
export function addFavor(data) {
    return get(`${host}/user/optional/add/stock`, data);
}

//删除自选
export function deleteFavor(data) {
    return get(`${host}/user/optional/stock/delete`, data);
}
export function updateFavor(data){
    return get(`${host}/user/optional/update/remark`, data);
}


//自选列表
export function favorList(data) {
    return get(`${host}/user/optional/list`, data);
}


//主力合约列表
export function getMainList(data) {
    return get(`${host}/quote/futu/main`, data);
}

//下单
export function orderInput(data) {
    return get(`${ctp}/full/ctptrade/orderinput`, data);
}
//股票下单
export function orderInputStk(data){
    return get(`${host}/secu/entrustenter`, data);
}

//股票持仓


//股票委托
export function entrustList(data){
    return get(`${host}/secu/entrustqry`, data);
}


//最优策略详情
export function startegyDetail(data){
    return get(`${host}/quant/strategy/optimal/report`, data);
}

export function setTradeRoomStatus(data){
    return post(`${host}/full/sys/config/updateByKey`, data,true);
}

export function getTradeRoomStatus(data){
    return get(`${host}/full/sys/config/getOneByKey`, data);
}

//查询股票止盈价
export function getProfitPrice(data){
    return get(`${host}/secu/stockpositionqry`, data);
}

//修改止盈价
export function updateProfitPrice(data){
    return get(`${host}/full/ctptrade/updateProfitAndLossRatio`, data);
}







