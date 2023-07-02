import { useState } from "react";
import DefaultValues from "../../../constants.ts";

export function FontPicker({
    setFont,
}: {
    setFont: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [dropdownVisibility, setDropdownVisibility] =
        useState<boolean>(false);
    return (
        <>
            <button onClick={() => setDropdownVisibility(!dropdownVisibility)}>
                Polices
            </button>
            {dropdownVisibility && (
                <div className="fonts-grid">
                    {DefaultValues.DEFAULT_SUPPORTED_FONTS.map((font, key) => (
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
                            {font}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
