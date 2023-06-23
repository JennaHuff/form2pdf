import { ReactElement, useState } from "react";
import "./App.css";
import {
    Text,
    Document,
    PDFViewer,
    Page,
    View,
    PDFDownloadLink,
} from "@react-pdf/renderer";

interface IFormAnswers {
    firstName?: string;
    lastName?: string;
    fantaisie?: boolean;
}
function Form({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<{}>>;
}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        setData(formJson);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            form.elements[index + 1].focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            form.elements[index - 1].focus();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-test">
                <p className="input-hint">
                    Conseil: appuyez sur Entrer pour passer à la question
                    suivante, appuyez sur Espace pour cocher la case, utilisez
                    les fleches haut et bas pour naviguer
                </p>
                <button
                    id="reset-form-button"
                    onClick={() => location.reload()}
                >
                    Réinitialiser
                </button>
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

function ResultingPDF({ formAnswers }: { formAnswers: IFormAnswers }) {
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

function DownloadPdfButton({ pdf }: { pdf: ReactElement }) {
    return (
        <PDFDownloadLink
            document={pdf}
            fileName="formulaire_declaration_manifestation_publique.pdf"
        >
            {({ loading, error }) =>
                loading ? (
                    <button>Chargement...</button>
                ) : error ? (
                    <p>
                        Une erreur est survenue, essayez de recharger la page!
                    </p>
                ) : (
                    <button className="form-button">Télécharger</button>
                )
            }
        </PDFDownloadLink>
    );
}

function App() {
    const [data, setData] = useState<IFormAnswers>({});
    const resultPdf = <ResultingPDF formAnswers={data} />;
    return (
        <>
            {(window.onbeforeunload = () => confirm(""))}
            <h1>Formulaire de déclaration de manifestation publique </h1>
            <Form setData={setData} />
            <DownloadPdfButton pdf={resultPdf} />
            <p>Here's your data: {JSON.stringify(data)}</p>
            <PDFViewer className="pdf-viewer">{resultPdf}</PDFViewer>
        </>
    );
}

export default App;
