"use client"
import { atom } from "jotai"

export const navRefGlobal = atom<HTMLElement | null>(null)
export const globalTheme = atom<boolean | undefined>(undefined)

