import Compact from "@uiw/react-color-compact";

function ColorPicker({
    color,
    setColor,
    label,
}: {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    label: string;
}) {
    return (
        <label className="color-picker">
            {label}
            <Compact
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
            <ColorPicker
                label={"Image"}
                color={svgColor}
                setColor={setSvgColor}
            />
            <ColorPicker
                label={"Fond"}
                color={backgroundColor}
                setColor={setBackgroundColor}
            />
            <ColorPicker
                label={"Texte"}
                color={fontColor}
                setColor={setFontColor}
            />
        </div>
    );
}
