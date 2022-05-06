import { createContext, useContext, useState } from 'react'
export const NameContext = createContext(null)

export function NameContextWrapper({ children }) {
    const [name, setName] = useState('')
    return (
        <NameContext.Provider value={[name, setName]}>
            {children}
        </NameContext.Provider>
    )
}

export function useNameContext() {
    return useContext(NameContext)
}