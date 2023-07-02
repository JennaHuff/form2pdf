export default function CopyToClipboard({ data }: { data: IFormAnswers }) {
    return (
        <div className="copy-to-clipboard">
            <p>
                Here's your data: <i>(store it yourself)</i>
                {JSON.stringify(data)}
                <br />
            </p>
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
