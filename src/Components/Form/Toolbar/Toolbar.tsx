import DownloadPdfButton from "./Buttons/DownloadPdf";
import ModifyPreviousAnswers from "./Buttons/ModifyPreviousAnswers";
import ResetFormButton from "./Buttons/ResetForm";

export default function Toolbar({
    setData,
    defaultData,
    pdf,
}: {
    setData: React.Dispatch<React.SetStateAction<IFormAnswers>>;
    defaultData: IFormAnswers;
    pdf: any;
}) {
    return (
        <div className="toolbar">
            <DownloadPdfButton pdf={pdf} />
            <ModifyPreviousAnswers setData={setData} />
            <ResetFormButton setData={setData} defaultData={defaultData} />
        </div>
    );
}
