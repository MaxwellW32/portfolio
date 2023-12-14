"use client"

import { useAtom } from 'jotai'
import { ReactNode, useEffect, useMemo } from 'react'
import { globalTheme } from './globalState'
import { retreiveFromLocalStorage, saveToLocalStorage } from './savestorage'

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, themeSet] = useAtom(globalTheme)

    //read browser theme
    useEffect(() => {
        if (theme === undefined) {
            const seenTheme = retreiveFromLocalStorage("theme")

            if (seenTheme !== null) {
                //set saved theme
                themeSet(seenTheme)
                return
            }

            //check preference for theme
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkModeMediaQuery.matches) {
                themeSet(false)
            } else {
                //default of light mode
                themeSet(true)
            }
        }
    }, [])

    //write theme to storage
    useEffect(() => {
        if (theme !== undefined) {
            saveToLocalStorage("theme", theme)
        }
    }, [theme])


    const themeStyles = useMemo(() => {
        type themeObj = {
            [key: string]: string
        }

        if (theme === undefined) return {}

        const newThemeObj: themeObj = {
            '--mainColor': theme ? "255 199 95" : "132 94 194",
            '--secondColor': theme ? "255 150 113" : "214 93 177",
            '--whiteSwitch': theme ? "255 255 255" : "0 0 0",
            '--blackSwitch': theme ? "0 0 0" : "255 255 255"
        }

        return newThemeObj
    }, [theme])

    return (
        <div id='rootDiv' style={{ display: theme === undefined ? "none" : "", ...themeStyles }}>
            {children}
        </div>
    )
}
