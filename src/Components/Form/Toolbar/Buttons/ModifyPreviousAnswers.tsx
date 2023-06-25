import { useState } from "react";

export default function ModifyPreviousAnswers({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
}) {
    const [modifyExisting, setModifyInputVisibility] = useState(false);
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
                    setData(JSON.parse(e.target.value));
                }}
                style={{ display: modifyExisting === true ? "" : "none" }}
            />
        </>
    );
}
