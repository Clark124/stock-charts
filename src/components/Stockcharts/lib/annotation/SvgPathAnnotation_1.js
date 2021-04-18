

import React, { Component } from "react";
import PropTypes from "prop-types";
import { functor } from "react-stockcharts/lib/utils";

class SvgPathAnnotation_1 extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		const { onClick } = this.props;

		if (onClick) {
			const { xScale, yScale, datum } = this.props;
			onClick({ xScale, yScale, datum }, e);
		}
	}
	render() {
		const { className, opacity } = this.props;
		const { xAccessor, xScale, yScale } = this.props;

		const { x, y, fill, tooltip } = helper(this.props, xAccessor, xScale, yScale);
        
		return (<g className={className} onClick={this.handleClick}>
			<title>{tooltip}</title>
		
			{tooltip&&<circle cx={x} cy={y} r="10" stroke={fill} strokeWidth="1"  opacity={fill === '#000000' ? 0 : opacity} />}
			{tooltip==='买平'?<path d={`M${x-4} ${y-2} L${x+4} ${y-2} L${x+4} ${y+2} L${x-4} ${y+2} Z`} fill={fill}/>:""}
			{tooltip==='卖平'||tooltip==='卖'?<path d={`M${x-4} ${y-2} L${x+4} ${y-2} L${x+4} ${y+2} L${x-4} ${y+2} Z`} fill={fill}/>:""}
			{tooltip==='买开'||tooltip==='买'?<path d={`M${x} ${y-6} L${x-4} ${y+6} L${x} ${y} L${x+4} ${y+6} Z`} fill={fill}/>:""}
			{tooltip==='卖开'?<path d={`M${x} ${y+6} L${x-4} ${y-6} L${x} ${y} L${x+4} ${y-6} Z`} fill={fill}/>:""}
		</g>);
	}
}

function helper(props, xAccessor, xScale, yScale) {
	const { x, y, datum, fill, tooltip, plotData } = props;

	const xFunc = functor(x);
	const yFunc = functor(y);

	const [xPos, yPos] = [xFunc({ xScale, xAccessor, datum, plotData }), yFunc({ yScale, datum, plotData })];

	return {
		x: xPos,
		y: yPos,
		fill: functor(fill)(datum),
		tooltip: functor(tooltip)(datum),
	};
}

SvgPathAnnotation_1.propTypes = {
	className: PropTypes.string,
	path: PropTypes.func.isRequired,
	onClick: PropTypes.func,
	xAccessor: PropTypes.func,
	xScale: PropTypes.func,
	yScale: PropTypes.func,
	datum: PropTypes.object,
	stroke: PropTypes.string,
	opacity: PropTypes.number,
};

SvgPathAnnotation_1.defaultProps = {
	className: "react-stockcharts-svgpathannotation",
	opacity: 1,
	x: ({ xScale, xAccessor, datum }) => xScale(xAccessor(datum)),
};

export default SvgPathAnnotation_1;