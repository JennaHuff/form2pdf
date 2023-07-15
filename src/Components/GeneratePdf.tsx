import { Text, Document, Page, View, Svg, Path } from "@react-pdf/renderer";

export default function GeneratePdf({ data }: { data: IData }) {
    const { formAnswers, colors, font } = data;
    const { svgColor, backgroundColor, fontColor } = colors;
    console.log(formAnswers);

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
                    {Object.keys(formAnswers).map((objectKey, key) => (
                        <Text
                            key={key}
                            style={{
                                color: fontColor,
                                fontFamily: font,
                            }}
                        >
                            {objectKey + ": "}
                            {typeof formAnswers[
                                objectKey as keyof typeof formAnswers
                            ] === "boolean"
                                ? formAnswers[
                                      objectKey as keyof typeof formAnswers
                                  ]!.toString() // 'checkboxTicked: "true"'
                                : formAnswers[
                                      objectKey as keyof typeof formAnswers
                                  ]}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
