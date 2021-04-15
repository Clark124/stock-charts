import { rebind, merge } from "react-stockcharts/lib/utils";
import  cci  from "../calculator/cci";

import  baseIndicator  from "react-stockcharts/lib/indicator/baseIndicator";

const ALGORITHM_TYPE = "CCI";

export default function name() {

	const base = baseIndicator()
		.type(ALGORITHM_TYPE);

	const underlyingAlgorithm = cci();

	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, indicator) => { datum.cci = indicator; });

	const indicator = function(data, options = { merge: true }) {
		if (options.merge) {
			if (!base.accessor()) throw new Error(`Set an accessor to ${ALGORITHM_TYPE} before calculating`);
			return mergedAlgorithm(data);
		}
		return underlyingAlgorithm(data);
	};

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type");
	rebind(indicator, underlyingAlgorithm, "options");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}