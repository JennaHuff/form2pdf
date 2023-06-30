import DownloadPdfButton from "./Buttons/DownloadPdf";
import ModifyPreviousAnswers from "./Buttons/ModifyPreviousAnswers";
import ResetFormButton from "./Buttons/ResetForm";

export default function Toolbar({
    setData,
    pdf,
    colors,
}: {
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    pdf: any;
    colors: IColors;
}) {
    return (
        <div className="toolbar">
            <DownloadPdfButton pdf={pdf} />
            <ModifyPreviousAnswers setData={setData} />
            <ResetFormButton setData={setData} colors={colors} />
        </div>
    );
}
