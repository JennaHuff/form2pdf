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
import DefaultValues from "../constants.ts";

function TextInput({
    data,
    setData,
    handleKeyUp,
    label,
    name,
    value,
    hint,
}: any) {
    return (
        <label>
            {label}
            <input
                type="text"
                name={name}
                onKeyUp={handleKeyUp}
                value={value}
                onChange={(e) => setData({ ...data, [name]: e.target.value })}
            />
            <p className="input-hint">{hint}</p>
        </label>
    );
}

function ColorPicker({ color, setColor, label }) {
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

function Form({
    data,
    setData,
    colors,
}: {
    data: IFormAnswers;
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    colors: any;
}) {
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
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="form-test">
                <TextInput
                    data={data}
                    setData={setData}
                    handleKeyUp={handleKeyUp}
                    label={"Prenom:"}
                    name={"firstName"}
                    value={data.firstName}
                    hint={
                        "Un prenom ne contient en général pas de chiffre, ex: Jean"
                    }
                />
                <TextInput
                    data={data}
                    setData={setData}
                    handleKeyUp={handleKeyUp}
                    label={"Nom:"}
                    name={"lastName"}
                    value={data.lastName}
                />
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
                </div>
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
    const [data, setData] = useState(DefaultValues.DEFAULT_FORM_ANSWERS);
    const [svgColor, setSvgColor] = useState(DefaultValues.DEFAULT_SVG_COLOR);
    const [backgroundColor, setBackgroundColor] = useState(
        DefaultValues.DEFAULT_BACKGROUND_COLOR
    );
    const colors: IColors = {
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

    window.onbeforeunload = () => confirm(""); // confirmation alert before page refresh/closing
    return (
        <>
            <Header />
            <div className="toolbar-and-form-flex">
                <Toolbar setData={setData} colors={colors} pdf={resultPdf} />
                <Form data={data} setData={setData} colors={colors} />
            </div>
            <CopyToClipboard data={data} />
            <PDFViewer className="pdf-viewer">{resultPdf}</PDFViewer>
        </>
    );
}

export default App;
