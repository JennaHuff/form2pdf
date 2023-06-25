export default function CopyToClipboard({ data }: { data: IFormAnswers }) {
    return (
        <div className="copy-to-clipboard">
            <pre>
                <p>
                    Here's your data: <i>(track it yourself)</i>{" "}
                </p>
                <p>{JSON.stringify(data)}</p>
            </pre>
            <button
                className="form-button"
                onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(data))
                }
            >
                Copier
            </button>
        </div>
    );
}
