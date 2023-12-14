import Image from "next/image"

export default function ImageTwoColumn(
    {
        imageOptions,
        secondEl,
        imageProps,
        secondElContProps,
        breakPoint = "200px",
        ...elementProps
    }: {
        imageOptions: { src: string, alt: string, resolution?: number }
        secondEl: JSX.Element,
        imageProps?: React.HTMLAttributes<HTMLImageElement>,
        secondElContProps?: React.HTMLAttributes<HTMLDivElement>,
        breakPoint?: string
    } & React.HTMLAttributes<HTMLDivElement>) {


    return (
        <div {...elementProps} style={{ padding: "1rem", display: "flex", flexWrap: "wrap", columnGap: "1rem", ...elementProps?.style }}>
            <Image {...imageProps as any} alt={imageOptions.alt} src={imageOptions.src} width={imageOptions.resolution ?? 1200} height={imageOptions.resolution ?? 1200} style={{ flex: `1 1 min(${breakPoint},100%)`, height: "350px", width: "100%", minWidth: "0px", objectFit: "cover", ...imageProps?.style }} />

            <div {...secondElContProps} style={{ flex: `1 1 min(${breakPoint},100%)`, display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr", ...secondElContProps?.style, }}>
                {secondEl}
            </div>
        </div>
    )
}