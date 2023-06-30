import { PDFDownloadLink } from "@react-pdf/renderer";

export default function DownloadPdfButton({ pdf }: any) {
    return (
        <PDFDownloadLink
            document={pdf}
            fileName="formulaire_declaration_manifestation_publique.pdf"
        >
            {({ error }) =>
                error ? (
                    <p>Une erreur est survenue, essayez de recharger la page</p>
                ) : (
                    <button className="form-button">Télécharger</button>
                )
            }
        </PDFDownloadLink>
    );
}
