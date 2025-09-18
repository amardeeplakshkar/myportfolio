import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { RootProvider } from 'fumadocs-ui/provider';

const MainProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RootProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </RootProvider>
    )
}

export default MainProvider