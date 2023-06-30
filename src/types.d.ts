interface IFormAnswers {
    firstName?: string;
    lastName?: string;
    fantaisie?: boolean;
}

interface IColors {
    svgColor: string;
    setSvgColor: React.Dispatch<React.SetStateAction<string>>;
    backgroundColor: string;
    setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
}
