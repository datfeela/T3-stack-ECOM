'use client'

import { type Dispatch, type SetStateAction, createContext, useContext, useState } from 'react'

interface ContextProps {
    count: number
    setCount: Dispatch<SetStateAction<number>>
}

export const GlobalContext = createContext<ContextProps>({
    count: 0,
    setCount: () => {
        return
    },
})

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0)

    return <GlobalContext.Provider value={{ count, setCount }}>{children}</GlobalContext.Provider>
}
