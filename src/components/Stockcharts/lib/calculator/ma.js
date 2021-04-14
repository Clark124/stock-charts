
import { MA as defaultOptions } from "./defaultOptionsForComputation";

export default function ma() {

    let options = defaultOptions;

    function calculator(data) {
        const { windowSize, sourcePath } = options;

        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {
            if (i < windowSize) {
                result.push(undefined);
                continue;
            }
            var sum = 0;
            for (var j = 0; j < windowSize; j++) {
                sum += data[i - j][sourcePath];
            }
            result.push(parseFloat(sum / windowSize).toFixed(2));
        }
       
        return result
    }
    calculator.undefinedLength = function () {
        const { windowSize } = options;
        return windowSize - 1;
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
