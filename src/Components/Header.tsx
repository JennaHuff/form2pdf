export default function Header({ children }: { children: any }) {
    return (
        <div className="header">
            <h1>Form2Pdf </h1>
            {children}
        </div>
    );
}
