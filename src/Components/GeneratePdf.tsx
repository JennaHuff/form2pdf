import { Text, Document, Page, View, Svg, Path } from "@react-pdf/renderer";

export default function GeneratePdf({
    formAnswers,
    colors,
    font,
}: {
    formAnswers: IFormAnswers;
    colors: IColors;
    font: string;
}) {
    return (
        <Document>
            <Page
                size="A4"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: colors.backgroundColor,
                }}
            >
                <Svg width="190" height="160">
                    <Path
                        d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                        stroke={colors.svgColor}
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
                        <Text
                            style={{
                                color: colors.fontColor,
                                fontFamily: font,
                            }}
                        >
                            {key}:
                            {typeof formAnswers[key as keyof IFormAnswers] ===
                            "boolean"
                                ? formAnswers[
                                      key as keyof IFormAnswers
                                  ]!.toString() // 'checkboxTicked: "true"'
                                : formAnswers[key as keyof IFormAnswers]}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
