interface IFormAnswers {
    firstName?: string;
    lastName?: string;
    fantaisie?: boolean;
}

interface IData {
    formAnswers: IFormAnswers;
    colors: IColors;
    font: string;
}

interface IColors {
    svgColor: string;
    setSvgColor: React.Dispatch<>;
    backgroundColor: string;
    setBackgroundColor: React.Dispatch<>;
    fontColor: string;
    setFontColor: React.Dispatch<>;
}
