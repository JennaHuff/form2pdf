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
    return (
        <div className="colors-component">
            <label>Couleurs:</label>
            <ColorPicker
                label={"Svg"}
                color={colors.svgColor}
                setColor={colors.setSvgColor}
            />
            <ColorPicker
                label={"Fond"}
                color={colors.backgroundColor}
                setColor={colors.setBackgroundColor}
            />
            <ColorPicker
                label={"Police"}
                color={colors.fontColor}
                setColor={colors.setFontColor}
            />
        </div>
    );
}