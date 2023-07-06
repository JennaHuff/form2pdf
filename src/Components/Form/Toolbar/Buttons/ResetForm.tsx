import { useState } from "react";
import ReactModal from "react-modal";

export default function ResetFormButton({
    setDefault,
}: {
    setDefault: Function;
}) {
    const [modalVisibility, setModalVisibility] = useState(false);
    ReactModal.setAppElement("#root");
    return (
        <>
            <button
                className="reset-form-button"
                onClick={() => setModalVisibility(true)}
            >
                Réinitialiser
            </button>
            <ReactModal isOpen={modalVisibility} className="reset-modal">
                <p>Attention, cela supprimera toutes vos réponses</p>
                <button
                    className="reset-form-button"
                    onClick={() => {
                        setDefault();
                        setModalVisibility(false);
                    }}
                >
                    Confirmer
                </button>
                <button onClick={() => setModalVisibility(false)}>
                    Annuler
                </button>
            </ReactModal>
        </>
    );
}
