import Header from "./Components/Header";
import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_FONT,
    DEFAULT_FONT_COLOR,
    DEFAULT_FORM_ANSWERS,
    DEFAULT_SVG_COLOR,
} from "../constants.ts";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";
import Toolbar from "./Components/Form/Toolbar/Toolbar";
import GeneratePdf from "./Components/GeneratePdf.tsx";
import ColorPickers from "./Components/Form/ColorPickers.tsx";
import { FontPicker } from "./Components/Form/FontPicker.tsx";
import { useState } from "react";
import { Form } from "./Components/Form/Form.tsx";

function App() {
    const stringUrlObj = decodeURI(location.href).split("?")[1]; // get url, last part (data obj)
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

    // history.pushState(null, "", `?${JSON.stringify(data)}`); // append data obj to url
    window.onbeforeunload = () => confirm(""); // confirmation alert before page refresh/closing

    return (
        <>
            <Header
                children={
                    <Toolbar
                        data={data}
                        setDefault={setDefault}
                        pdf={resultPdf}
                    />
                }
            />
            <div className="main-card">
                <Form
                    formAnswers={formAnswers}
                    setFormAnswers={setFormAnswers}
                />
                <ColorPickers colors={colors} />
                <FontPicker font={font} setFont={setFont} />
                <Toolbar data={data} setDefault={setDefault} pdf={resultPdf} />
            </div>
            <PDFViewer className="pdf-viewer">{resultPdf}</PDFViewer>
        </>
    );
}

export default App;
