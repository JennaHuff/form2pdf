import { Text, Document, Page, View, Svg, Path } from "@react-pdf/renderer";

export default function GeneratePdf({
    formAnswers,
    svgColor,
    backgroundColor,
    fontColor,
}: {
    formAnswers: IFormAnswers;
    svgColor: string;
    backgroundColor: string;
    fontColor: string;
}) {
    return (
        <Document>
            <Page
                size="A4"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: backgroundColor,
                }}
            >
                <Svg width="190" height="160">
                    <Path
                        d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                        stroke={svgColor}
                        strokeWidth={6}
                    />
                </Svg>
                <View
                    style={{
                        margin: "10vw",
                        lineHeight: "2px",
                    }}
                >
                    {Object.keys(formAnswers).map((key) => (
                        <Text style={{ color: fontColor }}>
                            {key}:
                            {typeof formAnswers[key] === "boolean"
                                ? formAnswers[key].toString()
                                : formAnswers[key]}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
