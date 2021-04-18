import { KeltnerChannel } from "../lib/series";
import { KeltnerChannelTooltip } from "../lib/tooltip";
const bbStroke = {
    top: "#964B00",
    middle: "#AAAAAA",
    bottom: "#964B00",
};

const bbFill = "#4682B4";

export default function BollingerBand(props) {
    const { calculator ,indicatorId} = props
    return (
        <>
            <KeltnerChannel yAccessor={d => d.keltnerChannel}
                stroke={bbStroke}
                fill={bbFill} />

            <KeltnerChannelTooltip
                origin={[0, 60]}
                yAccessor={d => d.keltnerChannel}
                options={calculator.options()}
                textFill="#AAAAAA"
                onClick={()=>props.setIndcatorParameter(indicatorId)}
            />

        </>
    )
}
