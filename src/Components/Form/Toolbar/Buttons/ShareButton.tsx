import { useState } from "react";
import CopyToClipboard from "../../CopyToClipboard";
import { useWindowSize } from "@uidotdev/usehooks";

export function ShareButton({ data }: { data: IData }) {
    const windowWidth = useWindowSize().width;
    const [shareModal, setShareModal] = useState(false);
    return (
        <label onClick={() => setShareModal(!shareModal)}>
            <button className="form-button">
                {windowWidth > 800 ? (
                    "Partager"
                ) : (
                    <span className="material-symbols-outlined">share</span>
                )}
            </button>

            {shareModal && <CopyToClipboard data={data} />}
        </label>
    );
}
