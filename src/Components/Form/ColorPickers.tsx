import Compact from "@uiw/react-color-compact";
import { useState } from "react";

function ColorPicker({
    color,
    setColor,
    label,
}: {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    label: string;
}) {
    const [compactVisibility, setCompactVisibility] = useState(true);
    return (
        <label className="color-picker">
            <button onClick={() => setCompactVisibility(!compactVisibility)}>
                {label}
            </button>
            <Compact
                style={{
                    display: compactVisibility ? "none" : "block",
                }}
                color={color}
                onChange={(color) => {
                    setColor(color.hex);
                }}
            />
        </label>
    );
}

export default function ColorPickers({ colors }: { colors: IColors }) {
    const {
        svgColor,
        setSvgColor,
        backgroundColor,
        setBackgroundColor,
        fontColor,
        setFontColor,
    } = colors;

    return (
        <div className="colors-component">
            <label>Couleurs:</label>
            <ColorPicker
                label={"Svg"}
                color={svgColor}
                setColor={setSvgColor}
            />
            <ColorPicker
                label={"Fond"}
                color={backgroundColor}
                setColor={setBackgroundColor}
            />
            <ColorPicker
                label={"Police"}
                color={fontColor}
                setColor={setFontColor}
            />
        </div>
    );
}
