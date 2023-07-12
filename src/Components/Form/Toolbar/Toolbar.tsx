import DownloadPdfButton from "./Buttons/DownloadPdf";
import ResetFormButton from "./Buttons/ResetForm";
import { ShareButton } from "./Buttons/ShareButton";

export default function Toolbar({
    data,
    setDefault,
    pdf,
}: {
    data: IData;
    setDefault: Function;
    pdf: any;
}) {
    return (
        <div className="toolbar">
            <DownloadPdfButton pdf={pdf} />
            <ShareButton data={data} />
            <ResetFormButton setDefault={setDefault} />
        </div>
    );
}
