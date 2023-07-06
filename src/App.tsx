import Header from "./Components/Header";
import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_FONT,
    DEFAULT_FONT_COLOR,
    DEFAULT_FORM_ANSWERS,
    DEFAULT_SVG_COLOR,
} from "../constants.ts";
import { useEffect, useState } from "react";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";
import Toolbar from "./Components/Form/Toolbar/Toolbar";
import CopyToClipboard from "./Components/Form/CopyToClipboard";
import GeneratePdf from "./Components/GeneratePdf.tsx";
import ColorPickers from "./Components/Form/ColorPickers.tsx";
import { FontPicker } from "./Components/Form/FontPicker.tsx";

function TextInput({ data, setData, label, name, value, hint }: any) {
    return (
        <label>
            {label}
            <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => setData({ ...data, [name]: e.target.value })}
            />
            <p className="input-hint">{hint}</p>
        </label>
    );
}

function Form({
    formAnswers,
    setFormAnswers,
}: {
    formAnswers: IFormAnswers;
    setFormAnswers: React.Dispatch<React.SetStateAction<IFormAnswers>>;
}) {
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="form">
                <TextInput
                    data={formAnswers}
                    setData={setFormAnswers}
                    label={"Prenom:"}
                    name={"firstName"}
                    value={formAnswers.firstName}
                    hint={
                        "Un prenom ne contient en général pas de chiffre, ex: Jean"
                    }
                />
                <TextInput
                    data={formAnswers}
                    setData={setFormAnswers}
                    label={"Nom:"}
                    name={"lastName"}
                    value={formAnswers.lastName}
                />
                <label>
                    Fantaisie:
                    <input
                        type="checkbox"
                        name="fantaisie"
                        checked={formAnswers.fantaisie}
                        onChange={(e) => {
                            setFormAnswers({
                                ...formAnswers,
                                ["fantaisie"]: e.target.checked,
                            });
                        }}
                    />
                </label>
            </form>
        </>
    );
}

function App() {
    const stringUrlObj = decodeURI(location.href).split("/")[3]; // get url, last part (data obj)
    let parsedUrlObj = null;
    try {
        parsedUrlObj = JSON.parse(stringUrlObj);
    } catch (error: any) {
        console.log(error);
    }
    const [formAnswers, setFormAnswers] = useState(
        parsedUrlObj && parsedUrlObj.formAnswers
            ? parsedUrlObj.formAnswers
            : DEFAULT_FORM_ANSWERS
    );
    const [svgColor, setSvgColor] = useState(DEFAULT_SVG_COLOR);
    const [backgroundColor, setBackgroundColor] = useState(
        DEFAULT_BACKGROUND_COLOR
    );
    const [fontColor, setFontColor] = useState(DEFAULT_FONT_COLOR);
    const [font, setFont] = useState(DEFAULT_FONT);

    function setDefault() {
        setFormAnswers(DEFAULT_FORM_ANSWERS);
        setSvgColor(DEFAULT_SVG_COLOR);
        setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
        setFontColor(DEFAULT_FONT_COLOR);
        setFont(DEFAULT_FONT);
    }

    const colors: IColors = {
        svgColor,
        setSvgColor,
        backgroundColor,
        setBackgroundColor,
        fontColor,
        setFontColor,
    };

    const data: IData = {
        formAnswers,
        colors,
        font,
    };

    const resultPdf = <GeneratePdf data={data} />;

    history.pushState(null, "", JSON.stringify(data)); // append data obj to url

    window.onbeforeunload = () => confirm(""); // confirmation alert before page refresh/closing
    return (
        <>
            <Header />
            <Toolbar setDefault={setDefault} pdf={resultPdf} />
            <Form formAnswers={formAnswers} setFormAnswers={setFormAnswers} />
            <ColorPickers colors={colors} />
            <FontPicker setFont={setFont} />
            <CopyToClipboard data={data} />
            <PDFViewer className="pdf-viewer">{resultPdf}</PDFViewer>
        </>
    );
}

export default App;
