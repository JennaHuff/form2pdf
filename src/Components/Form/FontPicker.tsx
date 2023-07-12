import { useState } from "react";
import { DEFAULT_SUPPORTED_FONTS } from "../../../constants";

export function FontPicker({
    font,
    setFont,
}: {
    font: string;
    setFont: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [dropdownVisibility, setDropdownVisibility] =
        useState<boolean>(false);
    return (
        <>
            {/* <button onClick={() => setDropdownVisibility(!dropdownVisibility)}>
                Polices
            </button> */}
            <div className="font-component">
                <label>Police: </label>
                <u
                    style={{
                        fontFamily: font.split("-")[0],
                        fontWeight: font.includes("Bold") ? "bold" : "normal",
                        fontStyle:
                            font.includes("Oblique") || font.includes("Italic")
                                ? "italic"
                                : "normal",
                    }}
                >
                    {font}
                </u>
                <div className="fonts-grid">
                    {DEFAULT_SUPPORTED_FONTS.map((font, key) => (
                        <button
                            key={key}
                            onClick={() => setFont(font)}
                            style={{
                                fontFamily: font.split("-")[0],
                                fontWeight: font.includes("Bold")
                                    ? "bold"
                                    : "normal",
                                fontStyle:
                                    font.includes("Oblique") ||
                                    font.includes("Italic")
                                        ? "italic"
                                        : "normal",
                            }}
                        >
                            {/* {font} */}
                            Aa
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
