import { useState } from "react";
import CopyToClipboard from "../../CopyToClipboard";

export function ShareButton({ data }: { data: IData }) {
    const [shareModal, setShareModal] = useState(false);
    return (
        <label onClick={() => setShareModal(!shareModal)}>
            <button className="form-button">Partager</button>

            {shareModal && <CopyToClipboard data={data} />}
        </label>
    );
}
