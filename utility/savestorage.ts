"use client"

export function saveToLocalStorage(keyName: any, item: any) {
    localStorage.setItem(keyName, JSON.stringify(item));
}

export function retreiveFromLocalStorage(keyName: string): any {
    const initialkeyItem = localStorage.getItem(keyName);

    if (initialkeyItem !== null) return JSON.parse(initialkeyItem);

    return null
}


