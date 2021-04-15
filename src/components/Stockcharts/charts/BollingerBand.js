import { BollingerSeries } from "../lib/series";
import { BollingerBandTooltip } from "../lib/tooltip";
const bbStroke = {
    top: "#964B00",
    middle: "#AAAAAA",
    bottom: "#964B00",
};

const bbFill = "#4682B4";

export default function BollingerBand(props) {
    const { calculator } = props
    return (
        <>
            <BollingerSeries yAccessor={d => d.bollingerBand}
                stroke={bbStroke}
                fill={bbFill} />

            <BollingerBandTooltip
                origin={[0, 60]}
                yAccessor={d => d.bollingerBand}
                options={calculator.options()}
                textFill="#AAAAAA"
            />

        </>
    )
}
