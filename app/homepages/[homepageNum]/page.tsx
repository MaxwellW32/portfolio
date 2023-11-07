"use client"
import { useEffect, useLayoutEffect, useState } from 'react'
import styles from "./styles.module.css"
import Mountain from '../mountain/Mountain'
import { navRefGlobal } from '../../../Components/Useful/globalState'
import { useAtom } from 'jotai'
import Cubes from '../cubes/Cubes'
import Router, { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { homepageNum: string } }) {
    const router = useRouter()
    const [homepages, homepagesSet] = useState<JSX.Element[]>([<Mountain key={1} />, <Cubes key={2} />])
    const [currentIndex, currentIndexSet] = useState(() => {
        let seenNum = parseInt(params.homepageNum)

        if (Number.isNaN(seenNum)) return 0

        if (seenNum >= 0 && seenNum <= homepages.length - 1) {
            return seenNum
        } else {
            return 0
        }
    })
    const [navRef, navRefSet] = useAtom(navRefGlobal)
    const [showingMenu, showingMenuSet] = useState(true)

    //update page
    useEffect(() => {
        router.push(`/homepages/${currentIndex}`)
    }, [currentIndex])

    useEffect(() => {

        return () => {
            const seenNav = document.querySelector("#mainNav") as HTMLElement
            seenNav.style.display = "grid"
        }
    }, [])


    return (
        <div style={{ gridArea: "b", display: "grid", gridTemplateRows: "100%", position: "relative" }}>
            {homepages[currentIndex]}

            <div style={{ position: "fixed", bottom: 0, left: "50%", translate: "-50% 0", padding: "1rem", backgroundColor: "#000", display: "grid", justifyItems: "center", opacity: showingMenu ? 1 : 0.4, zIndex: "2" }}>
                <svg style={{ width: "1rem", aspectRatio: "1/1", fill: "#fff", rotate: showingMenu ? "0deg" : "-180deg", transition: "rotate 1s, scale 600ms" }} onClick={() => {
                    const showingMenuLocal = !showingMenu
                    showingMenuSet(showingMenuLocal)
                    if (showingMenuLocal) {
                        navRef!.style.display = "grid"
                    } else {
                        navRef!.style.display = "none"
                    }

                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z" /></svg>

                <div style={{ display: showingMenu ? "flex" : "none", flexWrap: "wrap", justifyContent: "center", gap: "1rem", }}>
                    <button onClick={() => {
                        currentIndexSet(prev => {
                            let newNum = prev - 1

                            if (newNum < 0) {
                                newNum = homepages.length - 1
                            }

                            return newNum
                        })
                    }}>prev</button>

                    <button onClick={() => {
                        currentIndexSet(prev => {
                            let newNum = prev + 1

                            if (newNum > homepages.length - 1) {
                                newNum = 0
                            }

                            return newNum
                        })
                    }}>next</button>
                </div>
            </div>
        </div>
    )
}
