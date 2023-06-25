export default function ResetFormButton({
    setData,
    defaultData,
}: {
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    defaultData: IFormAnswers;
}) {
    return (
        <button
            className="reset-form-button"
            onClick={() => setData(defaultData)}
        >
            Réinitialiser
        </button>
    );
}
