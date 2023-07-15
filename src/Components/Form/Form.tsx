export function TextInput({ data, setData, label, name, value, hint }: any) {
    return (
        <label>
            {label}
            <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => setData({ ...data, [name]: e.target.value })}
            />
            <p className="input-hint">{hint}</p>
        </label>
    );
}

export function Form({
    formAnswers,
    setFormAnswers,
}: {
    formAnswers: IFormAnswers;
    setFormAnswers: React.Dispatch<React.SetStateAction<IFormAnswers>>;
}) {
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="form">
                <TextInput
                    data={formAnswers}
                    setData={setFormAnswers}
                    label={"Prenom:"}
                    name={"firstName"}
                    value={formAnswers.firstName}
                    hint={
                        "Un prenom ne contient en général pas de chiffre, ex: Jean"
                    }
                />
                <TextInput
                    data={formAnswers}
                    setData={setFormAnswers}
                    label={"Nom:"}
                    name={"lastName"}
                    value={formAnswers.lastName}
                    hint={"exemple: Musk"}
                />
                <label>
                    Fantaisie:
                    <input
                        type="checkbox"
                        name="fantaisie"
                        checked={formAnswers.fantaisie}
                        onChange={(e) => {
                            setFormAnswers({
                                ...formAnswers,
                                ["fantaisie"]: e.target.checked,
                            });
                        }}
                    />
                </label>
            </form>
        </>
    );
}
