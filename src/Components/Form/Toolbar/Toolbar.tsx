import DownloadPdfButton from "./Buttons/DownloadPdf";
import ResetFormButton from "./Buttons/ResetForm";

export default function Toolbar({
    setDefault,
    pdf,
}: {
    setDefault: Function;
    pdf: any;
}) {
    return (
        <div className="toolbar">
            <DownloadPdfButton pdf={pdf} />
            {/* <ModifyPreviousAnswers data={data} setData={setData} /> */}
            <ResetFormButton setDefault={setDefault} />
        </div>
    );
}
