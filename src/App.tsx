import { useState } from "react";
import "./App.css";
import ReactPDF, {
    Text,
    Document,
    PDFViewer,
    Page,
    View,
    PDFDownloadLink,
} from "@react-pdf/renderer";
import ReactModal from "react-modal";

function Form({ setData }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        setData(formJson);
    };
    const [modalVisibility, setModalVisibility] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit} className="form-test">
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
                        // defaultValue={"first name"}
                    />
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="lastName"
                        // defaultValue={"last name"}
                    />
                </label>
                <label>
                    Fantaisie
                    <input type="checkbox" name="fantaisie" />
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

function App() {
    const [data, setData] = useState({});

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
