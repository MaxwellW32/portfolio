"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
    useEffect(() => {
        router.push("/homepages/0")
    }, [])

    return (
        <div></div>
    )
}