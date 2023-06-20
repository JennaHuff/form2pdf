import { useState } from "react";
import "./App.css";
import ReactPDF, {
    Text,
    Document,
    PDFViewer,
    Page,
    View,
    PDFDownloadLink,
    usePDF,
    pdf,
} from "@react-pdf/renderer";
import ReactModal from "react-modal";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

function Form({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<{}>>;
}) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        setData(formJson);
    };
    const handleEnter = (e) => {
        if (e.key.toLowerCase() === "enter") {
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            form.elements[index + 1].focus();
            e.preventDefault();
        }
    };
    const [modalVisibility, setModalVisibility] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit} className="form-test">
                <p className="input-hint">
                    Conseil: appuyez sur Entrer pour passer à la prochaine
                    question, appuyez sur Espace pour cocher la case
                </p>
                <button
                    id="reset-form-button"
                    onClick={() => setModalVisibility(true)}
                >
                    Réinitialiser
                </button>
                <ReactModal isOpen={modalVisibility}>
                    {/* https://reactcommunity.org/react-modal/styles/classes/ */}
                    <h2 style={{ color: "red" }}>
                        Attention, cette action supprimera toutes les données
                        entrées
                    </h2>
                    <button
                        type="reset"
                        style={{ backgroundColor: "red", color: "white" }}
                    >
                        Réinitialiser
                    </button>
                    <button onClick={() => setModalVisibility(false)}>
                        Annuler
                    </button>
                </ReactModal>
                <label>
                    Prenom:
                    <input
                        type="text"
                        name="firstName"
                        onKeyDown={handleEnter}
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
                        onKeyDown={handleEnter}
                    />
                </label>
                <label>
                    Fantaisie
                    <input
                        type="checkbox"
                        name="fantaisie"
                        onKeyDown={handleEnter}
                    />
                </label>
                <button type="submit" className="form-button">
                    Générer le dossier
                </button>
            </form>
        </>
    );
}

function ResultingPDF({ formAnswers }) {
    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Your first name: {formAnswers.firstName}</Text>
                    <Text>Your last name: {formAnswers.lastName}</Text>
                    <Text>
                        Fantaisie: {formAnswers.fantaisie ? "oui" : "non"}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

function DownloadPDFButton({ PDF }) {
    return (
        <PDFDownloadLink
            document={PDF}
            fileName="formulaire_declaration_manifestation_publique.pdf"
        >
            {({ blob, url, loading, error }) =>
                loading ? (
                    <button>Chargement...</button>
                ) : (
                    <button className="form-button">Télécharger</button>
                )
            }
        </PDFDownloadLink>
    );
}

async function modifyPdf() {
    // Fetch an existing PDF document
    const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    console.log(existingPdfBytes);

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    // Draw a string of text diagonally across the first page
    firstPage.drawText("This text was added with JavaScript!", {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    var blob = new Blob([pdfBytes], { type: "application/pdf" });

    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "myFileName.pdf";
    link.click();
}

function App() {
    const [data, setData] = useState({});
    modifyPdf();
    // JSON.stringify(data);
    return (
        <>
            <h1>Formulaire de déclaration de manifestation publique </h1>
            <Form setData={setData} />
            <DownloadPDFButton PDF={<ResultingPDF formAnswers={data} />} />

            <PDFViewer className="pdf-viewer">
                <ResultingPDF formAnswers={data} />
            </PDFViewer>
        </>
    );
}

export default App;
