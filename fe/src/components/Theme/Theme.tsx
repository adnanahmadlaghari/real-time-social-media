import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material"
import { useGlobalVar } from "../Global/Global"
import type { ReactNode } from "react"



export const ThemeProvider = ({children} :{children: ReactNode}) => {
    
    const {theme} = useGlobalVar()

    const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

 const lightTheme = createTheme({
    palette: {
        mode: "light"
    }
})

return (
    <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        {children}
    </MuiThemeProvider>
)

}
