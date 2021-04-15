import {calcKDJ} from './calcKDJ'


const defaultOptions = {
    windowSize: 9,
    kWindowSize: 3,
    dWindowSize: 3,
};

export default function kdj() {
    let options = defaultOptions;
   
    let source = d => ({ open: d.open, high: d.high, low: d.low, close: d.close });

    function calculator(data) {
        const { windowSize, kWindowSize, dWindowSize } = options;
    
        let input = data.map((item, index) => {
            return {
                open: item.open,
                close: item.close,
                low: item.low,
                high: item.high
            }
        })
        
        const indicatorData = calcKDJ(windowSize, kWindowSize, dWindowSize, input)

        return indicatorData;

    }
    calculator.undefinedLength = function () {
        const { windowSize, kWindowSize, dWindowSize } = options;
        return windowSize + kWindowSize + dWindowSize;
    };
    calculator.source = function (x) {
        if (!arguments.length) {
            return source;
        }
        source = x;
        return calculator;
    };
    calculator.options = function (x) {
        if (!arguments.length) {
            return options;
        }
        options = { ...defaultOptions, ...x };
        return calculator;
    };

    return calculator;
}