import { useState } from "react";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";
import Toolbar from "./Components/Form/Toolbar/Toolbar";
import CopyToClipboard from "./Components/Form/CopyToClipboard";
import Compact from "@uiw/react-color-compact";
import Header from "./Components/Header";
import DefaultValues from "../constants.ts";
import GeneratePdf from "./Components/GeneratePdf.tsx";

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

function Form({
    data,
    setData,
    colors,
}: {
    data: IFormAnswers;
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    colors: any;
}) {
    const {
        svgColor,
        setSvgColor,
        backgroundColor,
        setBackgroundColor,
        fontColor,
        setFontColor,
    } = colors;

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
                    <ColorPicker
                        label={"Police"}
                        color={fontColor}
                        setColor={setFontColor}
                    />
                </div>
            </form>
        </>
    );
}

function App() {
    const [data, setData] = useState(DefaultValues.DEFAULT_FORM_ANSWERS);
    const [svgColor, setSvgColor] = useState(DefaultValues.DEFAULT_SVG_COLOR);
    const [backgroundColor, setBackgroundColor] = useState(
        DefaultValues.DEFAULT_BACKGROUND_COLOR
    );
    const [fontColor, setFontColor] = useState(
        DefaultValues.DEFAULT_FONT_COLOR
    );
    const colors: IColors = {
        svgColor,
        setSvgColor,
        backgroundColor,
        setBackgroundColor,
        fontColor,
        setFontColor,
    };

    const resultPdf = (
        <GeneratePdf
            formAnswers={data}
            svgColor={svgColor}
            backgroundColor={backgroundColor}
            fontColor={fontColor}
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
