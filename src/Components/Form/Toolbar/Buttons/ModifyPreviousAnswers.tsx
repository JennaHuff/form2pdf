import { useState } from "react";

export default function ModifyPreviousAnswers({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
}) {
    const [modifyExisting, setModifyInputVisibility] = useState(false);
    const [jsonError, setJsonError] = useState(null);
    return (
        <>
            <button
                className={"form-button"}
                onClick={() => setModifyInputVisibility(!modifyExisting)}
            >
                Modifier un formulaire existant
            </button>
            <input
                type="text"
                onChange={(e) => {
                    try {
                        setData(JSON.parse(e.target.value));
                        setJsonError(null);
                    } catch (error) {
                        if (e.target.value === "") {
                            setJsonError(null);
                            console.log("vis");
                        } else {
                            console.log(error.message);
                            setJsonError(error.message);
                        }
                    }
                }}
                placeholder="JSON data"
                style={{ display: modifyExisting === true ? "" : "none" }}
            />
            {jsonError && <p>Les données sont incompatibles</p>}
        </>
    );
}
