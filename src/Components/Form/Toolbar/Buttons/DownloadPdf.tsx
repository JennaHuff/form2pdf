import { PDFDownloadLink } from "@react-pdf/renderer";
import { useWindowSize } from "usehooks-ts";

export default function DownloadPdfButton({ pdf }: any) {
    const windowWidth = useWindowSize().width;
    return (
        <PDFDownloadLink
            document={pdf}
            fileName="formulaire_declaration_manifestation_publique.pdf"
        >
            {({ error }) =>
                error ? (
                    <p>Une erreur est survenue, essayez de recharger la page</p>
                ) : (
                    <button className="form-button">
                        {windowWidth > 800 ? (
                            "Télécharger"
                        ) : (
                            <span className="material-symbols-outlined">
                                download
                            </span>
                        )}
                    </button>
                )
            }
        </PDFDownloadLink>
    );
}
