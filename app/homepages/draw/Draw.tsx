"use client"
import { useEffect, useRef, useState, } from "react"
import styles from "./styles.module.css"

export default function Draw() {
    const initialArr = [3566, 583, 616, 583, 600, 600, 1200, 600, 616, 600, 600, 600, 583, 616, 600, 583, 600, 600, 600, 283, 283, 616, 683, 533, 583, 616, 600, 583, 616, 583, 633, 583, 266, 283, 616, 616, 600, 616, 600, 583, 600, 600, 916, 266, 916, 283, 616, 633, 583, 616, 649, 550, 299, 300, 583, 600, 600, 750, 266, 766, 633, 583, 600, 583, 600, 600, 616, 333, 250, 1816, 616, 616, 566, 583, 600, 599, 600, 616, 600, 583, 599, 616, 616, 600, 583, 600, 600, 616, 583, 583, 366, 850, 600, 333, 250, 616, 600, 600, 600, 600, 650, 616, 533, 600, 599, 583, 600, 616, 600, 600, 600, 600, 583, 600, 616, 616, 583, 1233, 1799]

    const [timings, timingsSet] = useState(() => {
        return initialArr.map((eachTime, eachTimeIndex) => {
            if (eachTimeIndex > 20 && eachTimeIndex < 80) {
                eachTime -= 4
            }
            return eachTime
        })
    })

    const timingsCurrentIndex = useRef(0)
    const position = useRef({ x: 0, y: 0 })
    const directionXY = useRef({ dX: 1, dY: 1 })
    const started = useRef(false)
    const playerRef = useRef<HTMLDivElement>(null!)
    const canvasHolder = useRef<HTMLDivElement>(null!)
    const canvas = useRef<HTMLDivElement>(null!)
    const buttonHolder = useRef<HTMLDivElement>(null!)
    const audioRef = useRef<HTMLAudioElement>(null!)

    const reset = () => {
        console.log(`$all reset`);

        const firstButton = buttonHolder.current.childNodes[0] as HTMLButtonElement
        const secondButton = buttonHolder.current.childNodes[1] as HTMLButtonElement
        firstButton.style.display = "block"
        secondButton.style.display = "none"

        started.current = false
        timingsCurrentIndex.current = 0

        clearInterval(moveInterval.current)
        moveInterval.current = undefined

        clearTimeout(directionSwapInterval.current)
        directionSwapInterval.current = undefined
    }

    const addAPoint = (side: "xSide" | "ySide", value: number) => {
        const newTop = playerRef.current.offsetTop + position.current.y
        const newLeft = playerRef.current.offsetLeft + position.current.x
        const newEl = document.createElement("div")

        newEl.classList.add(styles.point)
        const playerSize = playerRef.current.offsetWidth


        if (side === "xSide") {
            newEl.style.height = `${playerSize}px`
            newEl.style.width = `${2}px`
            if (value > 0) {
                //bang on left side vertical
                newEl.style.top = `${newTop}px`
                newEl.style.left = `${newLeft}px`
            } else {
                //bang on right side vertical
                newEl.style.top = `${newTop}px`
                newEl.style.left = `${newLeft + playerSize}px`
            }

        } else if (side === "ySide") {
            newEl.style.width = `${playerSize}px`
            newEl.style.height = `${2}px`

            if (value < 0) {
                //bang on bottom side vertical
                newEl.style.top = `${newTop + playerSize}px`
                newEl.style.left = `${newLeft}px`
            } else {
                //bang on top side vertical
                newEl.style.top = `${newTop}px`
                newEl.style.left = `${newLeft + playerSize}px`
            }
        }

        canvas.current.appendChild(newEl)
    }

    const changeColor = () => {
        const prettyColors = [
            '#FF6F61', // Coral
            '#FFD700', // Gold
            '#7FFFD4', // Aquamarine
            '#FF69B4', // Hot Pink
            '#6495ED', // Cornflower Blue
            '#20B2AA', // Light Sea Green
            '#9370DB'  // Medium Purple
        ];

        const filterdColors = prettyColors.filter(eachColor => eachColor !== playerRef.current.style.backgroundColor)

        playerRef.current.style.backgroundColor = filterdColors[Math.floor(Math.random() * filterdColors.length)]
    }

    const directionSwapInterval = useRef<NodeJS.Timeout | undefined>()
    const startDirectionSwap = () => {
        directionSwapInterval.current = setTimeout(() => {

            if (timingsCurrentIndex.current < timings.length - 1) {

                timingsCurrentIndex.current += 1
                let quarter = Math.floor(timings.length / 4);


                if (timingsCurrentIndex.current <= quarter) {
                    directionXY.current.dY *= -1
                    addAPoint("ySide", directionXY.current.dY)

                } else if (timingsCurrentIndex.current <= 2 * quarter) {
                    directionXY.current.dX *= -1
                    addAPoint("xSide", directionXY.current.dX)

                } else if (timingsCurrentIndex.current <= 3 * quarter) {
                    directionXY.current.dY *= -1
                    addAPoint("ySide", directionXY.current.dY)

                } else {
                    directionXY.current.dX *= -1
                    addAPoint("xSide", directionXY.current.dX)
                }

                //add element at this location
                changeColor()
                startDirectionSwap()

            } else {
                if (moveInterval.current) {
                    clearInterval(moveInterval.current)
                    moveInterval.current = undefined
                    reset()
                }
            }

        }, timings[timingsCurrentIndex.current])
    }

    const moveInterval = useRef<NodeJS.Timer | undefined>()
    const startMovement = () => {
        if (!moveInterval.current) {
            moveInterval.current = setInterval(() => {
                position.current.x += directionXY.current.dX
                position.current.y += directionXY.current.dY

                playerRef.current.style.translate = `${position.current.x}px ${position.current.y}px`

                //ensure stays centered
                let offsetX = playerRef.current.offsetLeft + (position.current.x - (canvasHolder.current.offsetWidth / 2));
                let offsetY = playerRef.current.offsetTop + (position.current.y - (canvasHolder.current.offsetHeight / 2));

                canvasHolder.current.scrollLeft = offsetX;
                canvasHolder.current.scrollTop = offsetY;
            }, 10)
        }
    }

    const start = () => {
        started.current = true

        const firstButton = buttonHolder.current.childNodes[0] as HTMLButtonElement
        const secondButton = buttonHolder.current.childNodes[1] as HTMLButtonElement
        firstButton.style.display = "none"
        secondButton.style.display = "block"

        startDirectionSwap()
        startMovement()
        audioRef.current.play()
    }

    useEffect(() => {
        canvasHolder.current.scrollLeft = canvasHolder.current.scrollWidth / 2 - canvasHolder.current.offsetWidth / 2
        canvasHolder.current.scrollTop = canvasHolder.current.scrollHeight / 2 - canvasHolder.current.offsetHeight / 2
    }, [])


    return (
        <div style={{ backgroundColor: "#bbb", overflowY: "auto", display: "grid", gridTemplateRows: "1fr auto", }}>
            <div ref={canvasHolder} style={{ backgroundColor: "#eee", overflow: "scroll", position: "relative" }}>
                <div ref={canvas} style={{ width: "1000000%", height: "1000000%", overflow: "scroll", backgroundColor: "#ddd", position: "relative", }}>
                    <div ref={playerRef} style={{ width: `50px`, aspectRatio: "1/1", backgroundColor: "red", position: "absolute", top: "50%", left: "50%", translate: `${0}px ${0}px` }}></div>
                </div>
            </div>

            <div ref={buttonHolder}>
                <button style={{ display: "block" }} onClick={() => {
                    start()
                }}>Start</button>

                <button style={{ display: "none" }} onClick={() => {
                    reset()
                }}>Stop</button>

                <audio ref={audioRef} src='/bgmusic.mp3' />
            </div>
        </div>
    )
}
