export default function CopyToClipboard({ data }: any) {
    return (
        <div className="copy-to-clipboard">
            <p>
                Copier ces reponses
                <br />
                <i>{encodeURI(location.href)}</i>
            </p>
            <button
                className="form-button"
                onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(data)),
                        alert("copied");
                }}
            >
                Copier
            </button>
        </div>
    );
}
