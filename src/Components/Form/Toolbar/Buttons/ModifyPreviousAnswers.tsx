import { useState } from "react";

export default function ModifyPreviousAnswers({
    data,
    setData,
}: {
    data: IData;
    setData: any;
}) {
    const [showInput, setShowInput] = useState(false);
    const [jsonError, setJsonError] = useState(null);
    return (
        <>
            <button
                className={"form-button"}
                onClick={() => setShowInput(!showInput)}
            >
                Reprendre
            </button>

            {showInput ? (
                <input
                    type="text"
                    value={JSON.stringify(data)}
                    onChange={(e) => {
                        try {
                            setData(e.target.value);
                            setJsonError(null);
                        } catch (error: any) {
                            if (e.target.value === "") {
                                setJsonError(null);
                            } else {
                                setJsonError(error.message);
                            }
                        }
                    }}
                    placeholder="JSON data"
                />
            ) : null}

            {jsonError && <p>Les données sont incompatibles</p>}
        </>
    );
}
