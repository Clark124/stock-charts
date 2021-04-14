import axios from 'axios';
import moment from 'moment'
import lodash from 'lodash'
import Service from './server'
import { message } from 'antd';

function stringifyURL(params, postFlag) {
  var paramUrl = '';
  for (var key in params) {
    if (!postFlag && paramUrl === '') {
      paramUrl += '?' + key + '=' + encodeURIComponent(params[key]);
    } else {
      paramUrl += '&' + key + '=' + encodeURIComponent(params[key]);
    }
  }
  return paramUrl;
}

// console.log(process.env.NODE_ENV)

// 'http://full.ezquant.cn'
// 'https://ezquant.spd9.com'
export const ctp=process.env.NODE_ENV==='development'?'https://ezquant.spd9.com':window.api.host 
export const host=process.env.NODE_ENV==='development'?'https://ezquant.spd9.com':window.api.host 
export const wsHost=process.env.NODE_ENV==='development'?'ws://ezquant.spd9.com':window.api.wsHost
export const wsCtpHost=process.env.NODE_ENV==='development'?'ws://123.206.133.200:8080':window.api.wsCtpHost

// axios.interceptors.response.use(res => {
//   if (res.data.retCode === -2||res.data.retCode===-1) {
//     // alert('请重新登录')
//     localStorage.removeItem('userInfo');
//     message.warning('请重新登录',()=>{
//       window.location = '/'
//     })
//     return;
//   } else {
//     return res;
//   }
// });


export function get(url, data) {
  return new Promise((resolve, reject) => {
    const token = localStorage.userInfo ? JSON.parse(localStorage.userInfo).token : '';
  
    axios.get(url, { params: data, headers: { token } })
      .then(res => {
        if (res !== undefined) {
          resolve(res.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function post1(url, data, isformData = false) {
  return new Promise((resolve, reject) => {
    let header = isformData ? null : { 'Content-type': 'application/json' };
    axios.post(url, data, header
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post2(url, data, isformData = false) {
  return new Promise((resolve, reject) => {
    axios.post(url+stringifyURL(data), data
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url, data, isJson = false) {
  return new Promise((resolve, reject) => {
    data = isJson ? data : stringifyURL(data, true);
    const token = localStorage.userInfo ? JSON.parse(localStorage.userInfo).token : '';
    let header = isJson
      ? { 'Content-type': 'application/json', token }
      : { 'Content-Type': 'application/x-www-form-urlencoded', token };
    axios
      .post(url, data, {
        headers: header,
      })
      .then(res => {
        if (res.data) {
          resolve(res.data);
        }
      })
      .catch(err => {
        message.error('服务报错')
        reject(err);
      });
  });
}

export function deleteApi(url, data) {
  return new Promise((resolve, reject) => {
    const token = localStorage.userInfo ? JSON.parse(localStorage.userInfo).token : '';
    axios
      .delete(url, { params: data, headers: { token } })
      .then(res => {
        if (res !== undefined) {
          resolve(res.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

/*k线数据格式化成图形需要的格式*/
export function changeNumber(Array, tickSize) {
  let arr = []
  Array.forEach((item) => {
    let date = ""
    if (item[0].toString().length === 8) {
      date = new Date(moment(item[0].toString(), 'YYYYMMDD').format('YYYY-MM-DD'))
    } else if (item[0].toString().length === 12) {
      date = new Date(moment(item[0].toString(), 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm'))
    }
    arr.push({
      close: +(item[4]).toFixed(tickSize),
      high: +(item[2]).toFixed(tickSize),
      low: +(item[3]).toFixed(tickSize),
      open: +(item[1]).toFixed(tickSize),
      date: date,
      volume: item[5]
    })

  })
  return arr
}

/*k线数据格式化成图形需要的格式2*/
export function conversionNum(obj, symbol) {
  if (!symbol) {
    return;
  }
  if (obj.candle[symbol].length < 2) return [];
  const list = {};
  let newData = [];
  obj.candle.fields.forEach((item, index) => {
    switch (item) {
      case 'min_time':
        list.date = index;
        break;
      case 'open_px':
        list.open = index;
        break;
      case 'high_px':
        list.high = index;
        break;
      case 'low_px':
        list.low = index;
        break;
      case 'close_px':
        list.close = index;
        break;
      case 'business_amount':
        list.volume = index;
        break;
      default:
        break;
    }
  });

  obj.candle[symbol].forEach(item => {
    let data = {};
    for (const key in list) {
      if (key === 'date') {
        if (item[list[key]].toString().length > 8)
          data[key] = new Date(
            item[list[key]].toString().replace(/(\w{4})(\w{2})(\w{2})(\w{2})/, '$1-$2-$3 $4:'),
          );
        else data[key] = new Date(item[list[key]].toString().replace(/(\w{4})(\w{2})/, '$1-$2-'));
      } else {
        data[key] = item[list[key]];
      }
    }
    newData.push(data);
  });
  return newData;
}

export function postData(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      url, data,
      method: 'post',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    })
  })
}

//缓存自选股
export function optional() {
  return new Promise((resolve, reject) => {
    post(Service.host + Service.marketFavoriteList, { user_id: localStorage.getItem('user_id') }).then((data) => {
      localStorage.setItem('optional', JSON.stringify(data.data))
      resolve(data)
    })
  })

}

/*获取字符保留位数的长度*/
export function tick_size(name) {
  return new Promise((resolve, reject) => {
    post(Service.host + Service.realPrecise, {}).then((data) => {
      // console.log(data)
      localStorage.setItem('TICK_SIZE', JSON.stringify(data))
      resolve(data)
    })
  })
}


//合约数据
export function contractData(data) {
  const marketCodeList = []
  if (data) {
    let marketData = Object.entries(data)
    marketData.forEach(((item, index) => {
      const symbol = item[1].split('.')
      marketCodeList.push({ symbol: item[0], market: symbol[1], currency: symbol[0] })
    }))
  }
  return lodash.cloneDeep(marketCodeList)
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */

export function debounce(func, wait, immediate) {
  let timeout

  return function() {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
* @desc 函数节流
* @param func 函数
* @param wait 延迟执行毫秒数
* @param type 1 表时间戳版，2 表定时器版
*/
export function throttle(func, wait ,type) {
  let previous;
  let timeout
   if(type===1){
       previous = 0;
   }
   return function() {
       let context = this;
       let args = arguments;
       if(type===1){
           let now = Date.now();

           if (now - previous > wait) {
               func.apply(context, args);
               previous = now;
           }
       }else if(type===2){
           if (!timeout) {
               timeout = setTimeout(() => {
                   timeout = null;
                   func.apply(context, args)
               }, wait)
           }
       }
   }
}

/**
 * 
 * 随机数
 */
export function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r && 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
/**
 * 获取url参数
 */
export function getQueryVariable(variable) {
  var query = window.location.href.split('?')[1]
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=') 
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}

export let log = console.log.bind(console);