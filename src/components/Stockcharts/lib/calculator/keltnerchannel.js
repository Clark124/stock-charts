import { mean } from "d3-array";

import ema from "react-stockcharts/lib/calculator/ema";
import { last, slidingWindow, zipper } from "react-stockcharts/lib/utils";

const defaultOptions = {
    windowSize: 20,
    // source: d => d.close, // "high", "low", "open", "close"
    sourcePath: "close",
    multiplier: 2,
    movingAverageType: "sma"
};

export default function name() {
    let options = defaultOptions;

    function calculator(data) {
        const { windowSize, multiplier, movingAverageType, sourcePath } = options;

        // const source = path(sourcePath);
        const meanAlgorithm = movingAverageType === "ema" ?
            ema().options({ windowSize, sourcePath }) :
            slidingWindow().windowSize(windowSize)
            .accumulator(values => mean(values)).sourcePath(sourcePath);

        const bollingerBandAlgorithm = slidingWindow()
            .windowSize(windowSize)
            .accumulator((values, index) => {
                if(index<10){
                    return {
                        top: '-',
                        middle: '-',
                        bottom: '-'
                    }
                }
                let sum = 0
                for (let i = index - 9; i <= index; i++) {
                   
                    const a1 = data[i].high - data[i].low
                    const a2 = Math.abs(data[i].high - data[i - 1].close)
                    const a3 = Math.abs(data[i].low - data[i - 1].close)
                    const max = Math.max(a1, a2, a3)
                    sum = sum + max
                }
                sum = sum / 10

                const avg = last(values).mean;
                // const stdDev = deviation(values, (each) => source(each.datum));
                return {
                    top: avg + multiplier * sum,
                    middle: avg,
                    bottom: avg - multiplier * sum
                };
            });

        const zip = zipper()
            .combine((datum, mean) => ({ datum, mean }));

        const tuples = zip(data, meanAlgorithm(data));
        bollingerBandAlgorithm(tuples)
        return bollingerBandAlgorithm(tuples);
    }
    calculator.undefinedLength = function() {
        const { windowSize } = options;
        return windowSize - 1;
    };
    calculator.options = function(x) {
        if (!arguments.length) {
            return options;
        }
        options = {...defaultOptions, ...x };
        return calculator;
    };


    return calculator;
}