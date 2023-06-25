import { useState } from "react";
import "./App.css";
import { Text, Document, PDFViewer, Page, View } from "@react-pdf/renderer";
import Toolbar from "./Components/Form/Toolbar/Toolbar";
import CopyToClipboard from "./Components/Form/CopyToClipboard";

function Form({
    data,
    setData,
}: {
    data: IFormAnswers;
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
}) {
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
                <p className="input-hint">
                    Conseil: appuyez sur Entrer pour passer à la question
                    suivante, appuyez sur Espace pour cocher la case, utilisez
                    les fleches haut et bas pour naviguer
                </p>
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
                    Fantaisie
                    <input
                        type="checkbox"
                        name="fantaisie"
                        checked={data.fantaisie}
                        onChange={(e) => {
                            setData({
                                ...data,
                                ["fantaisie"]: e.target.checked,
                            });
                            console.log(e.target.checked);
                        }}
                    />
                </label>
            </form>
        </>
    );
}

function ResultingPDF({ formAnswers }: { formAnswers: IFormAnswers }) {
    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Your first name: {formAnswers.firstName}</Text>
                    <Text>Your last name: {formAnswers.lastName}</Text>
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

    const resultPdf = <ResultingPDF formAnswers={data} />;

    window.onbeforeunload = () => confirm("");
    return (
        <>
            <h1>Formulaire de déclaration de manifestation publique </h1>
            <Toolbar
                defaultData={defaultData}
                setData={setData}
                pdf={resultPdf}
            />
            <Form data={data} setData={setData} />
            <CopyToClipboard data={data} />
            <PDFViewer className="pdf-viewer">{resultPdf}</PDFViewer>
        </>
    );
}

export default App;
