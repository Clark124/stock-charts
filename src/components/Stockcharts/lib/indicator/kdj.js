import { rebind, merge } from "../utils";

import  kdj  from "../calculator/kdj";

import  baseIndicator  from "./baseIndicator";

const ALGORITHM_TYPE = "KDJ";

export default function name() {
	const base = baseIndicator()
		.type(ALGORITHM_TYPE);

	const underlyingAlgorithm = kdj();

	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, indicator) => { datum.kdj = indicator; });

	const indicator = function(data, options = { merge: true }) {
		if (options.merge) {
			if (!base.accessor()) throw new Error(`Set an accessor to ${ALGORITHM_TYPE} before calculating`);
			return mergedAlgorithm(data);
		}
		return underlyingAlgorithm(data);
	};

	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type");
	rebind(indicator, underlyingAlgorithm, "options", "undefinedLength");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}