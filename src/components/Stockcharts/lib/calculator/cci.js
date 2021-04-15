

const defaultOptions = {
    windowSize: 14
}


export default function cci() {

	let options = defaultOptions;
	let source = d => ({ open: d.open, high: d.high, low: d.low, close: d.close });

	function calculator(data) {
		const { windowSize } = options;
		let newData = []
		let i,j,k
		for(i=0;i<data.length;i++){
			if(i<windowSize-1){
				newData.push(undefined)
			}else{
				
				const tp = (data[i].high+data[i].low+data[i].close)/3
				let ma = 0
				let md = 0
				let arr = []
				for(j=i-windowSize+1;j<=i;j++){
					const typ =  (data[j].high+data[j].low+data[j].close)/3
					ma = ma + typ
					arr.push(typ)
				}
				ma = ma/windowSize
				for(k = 0;k<arr.length;k++){
					md = md + Math.abs(arr[k]-ma)
				}
				md = md/windowSize
				const cci = (tp-ma)/md/0.015
				newData.push(cci)
			}
		}
	
		return newData;
	}
	calculator.undefinedLength = function() {
		const { windowSize } = options;
		return windowSize - 1;
	};
	calculator.options = function(x) {
		if (!arguments.length) {
			return options;
		}
		options = { ...defaultOptions, ...x };
		return calculator;
	};

	calculator.source = function(x) {
		if (!arguments.length) {
			return source;
		}
		source = x;
		return calculator;
	};
	return calculator;
	
}