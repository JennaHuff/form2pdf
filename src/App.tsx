import { useState } from "react";
import "./App.css";
import {
    Text,
    Document,
    PDFViewer,
    Page,
    View,
    Svg,
    Path,
} from "@react-pdf/renderer";
import Toolbar from "./Components/Form/Toolbar/Toolbar";
import CopyToClipboard from "./Components/Form/CopyToClipboard";
import Compact from "@uiw/react-color-compact";
import Header from "./Components/Header";

function Form({
    data,
    setData,
    colors,
}: {
    data: IFormAnswers;
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    colors: any;
}) {
    // svgColor: string;
    // setSvgColor: React.Dispatch<any>;
    const { svgColor, setSvgColor, backgroundColor, setBackgroundColor } =
        colors;
    const handleKeyUp = (e: any) => {
        console.log(e);
        const form = e.target.form;
        const index = [...form].indexOf(e.target);
        if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "Tab") {
            e.preventDefault();
            form.elements[index + 1].focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            form.elements[index - 1].focus();
        }
    };
    const [compactVisibility, setCompactVisibility] = useState(true);
    const [compact2Visibility, setCompact2Visibility] = useState(true);
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="form-test">
                <label>
                    Prenom:
                    <input
                        type="text"
                        name="firstName"
                        onKeyUp={handleKeyUp}
                        value={data.firstName}
                        onChange={(e) =>
                            setData({ ...data, ["firstName"]: e.target.value })
                        }
                    />
                    <p className="input-hint">
                        Un prenom ne contient en général pas de chiffre, ex:
                        Jean
                    </p>
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="lastName"
                        onKeyUp={handleKeyUp}
                        value={data.lastName}
                        onChange={(e) =>
                            setData({ ...data, ["lastName"]: e.target.value })
                        }
                    />
                </label>
                <label>
                    Fantaisie:
                    <input
                        type="checkbox"
                        name="fantaisie"
                        checked={data.fantaisie}
                        onChange={(e) => {
                            setData({
                                ...data,
                                ["fantaisie"]: e.target.checked,
                            });
                        }}
                    />
                </label>
                <label className="color-picker">
                    <button
                        onClick={() =>
                            setCompact2Visibility(!compact2Visibility)
                        }
                    >
                        Pick SVG color
                    </button>
                    <Compact
                        style={{
                            display: compact2Visibility ? "none" : "block",
                        }}
                        color={svgColor}
                        onChange={(color) => {
                            setSvgColor(color.hex);
                        }}
                    />
                </label>
                <label className="color-picker">
                    <button
                        onClick={() => setCompactVisibility(!compactVisibility)}
                    >
                        Pick background color
                    </button>

                    <Compact
                        style={{
                            display: compactVisibility ? "none" : "block",
                        }}
                        color={backgroundColor}
                        onChange={(color) => {
                            setBackgroundColor(color.hex);
                        }}
                    />
                </label>
            </form>
        </>
    );
}

function ResultingPDF({
    formAnswers,
    svgColor,
    backgroundColor,
}: {
    formAnswers: IFormAnswers;
    svgColor: string;
    backgroundColor: string;
}) {
    console.log(svgColor);
    return (
        <Document>
            <Page
                size="A4"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: backgroundColor,
                }}
            >
                <Svg width="190" height="160">
                    <Path
                        d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                        stroke={svgColor}
                        strokeWidth={6}
                    />
                </Svg>
                <View style={{ margin: "10vw", lineHeight: "2px" }}>
                    <Text>First name: {formAnswers.firstName}</Text>
                    <Text>Last name: {formAnswers.lastName}</Text>
                    <Text>Fantaisie: {formAnswers.fantaisie!.toString()}</Text>
                </View>
            </Page>
        </Document>
    );
}

function App() {
    const defaultData: IFormAnswers = {
        firstName: "",
        lastName: "",
        fantaisie: false,
    };
    const [data, setData] = useState(defaultData);

    const [svgColor, setSvgColor] = useState("#fff");
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const colors = {
        svgColor,
        setSvgColor,
        backgroundColor,
        setBackgroundColor,
    };

    const resultPdf = (
        <ResultingPDF
            formAnswers={data}
            svgColor={svgColor}
            backgroundColor={backgroundColor}
        />
    );

    window.onbeforeunload = () => confirm("");
    return (
        <>
            <Header />
            <div className="grid-container">
                <Toolbar
                    defaultData={defaultData}
                    setData={setData}
                    pdf={resultPdf}
                />
                <Form data={data} setData={setData} colors={colors} />
            </div>
            <CopyToClipboard data={data} />
            <PDFViewer className="pdf-viewer">{resultPdf}</PDFViewer>
        </>
    );
}

export default App;
