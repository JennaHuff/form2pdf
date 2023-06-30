import { useState } from "react";
import ReactModal from "react-modal";
import DefaultValues from "../../../../../constants";

export default function ResetFormButton({
    setData,
    colors,
}: {
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    colors: IColors;
}) {
    const { setSvgColor, setBackgroundColor } = colors;
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
            <ReactModal isOpen={modalVisibility}>
                <button
                    className="reset-form-button"
                    onClick={() => {
                        setData(DefaultValues.DEFAULT_FORM_ANSWERS),
                            setSvgColor(DefaultValues.DEFAULT_SVG_COLOR),
                            setBackgroundColor(
                                DefaultValues.DEFAULT_BACKGROUND_COLOR
                            );
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
