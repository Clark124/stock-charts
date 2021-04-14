import { LineSeries } from "../lib/series";
import { CurrentCoordinate } from "../lib/coordinates";

export default function MovingAverage(props) {
    const { calculator } = props
    return (
        <>
            <LineSeries yAccessor={calculator.accessor()} stroke={calculator.stroke()} />
            <CurrentCoordinate yAccessor={calculator.accessor()} fill={calculator.stroke()} />
        </>
    )
}