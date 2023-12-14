import Image from "next/image"
import { CSSProperties } from "react"
import styles from "./twocolumn.module.css"
export default function TwoColumn(
    {
        firstEl,
        secondEl,
        elementSizing = ["1 1 300px"],
        ...elementProps
    }: {
        firstEl: JSX.Element,
        secondEl: JSX.Element,
        elementSizing?: string[]
        headerAndTextContainerProps?: React.HTMLAttributes<HTMLDivElement>,
    } & React.HTMLAttributes<HTMLDivElement>) {


    return (
        <div {...elementProps} className={`${styles.mainEl} ${elementProps?.className}`} style={{
            "--RUFirstElementFlex": elementSizing[0],
            "--RUSecondElementFlex": elementSizing[1] ?? elementSizing[0],
            padding: "1rem", display: "flex", flexWrap: "wrap", columnGap: "1rem", ...elementProps?.style
        } as CSSProperties}>
            {firstEl}
            {secondEl}
        </div>
    )
}