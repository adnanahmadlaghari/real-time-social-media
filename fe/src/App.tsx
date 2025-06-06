import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import { Box, useTheme } from "@mui/material"


function App() {

  const theme = useTheme()

  return (
    <Box sx={{bgcolor: theme.palette.background.default, color: theme.palette.text.primary, height: "100vh", width: "100vw"}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Box >
  )
}

export default App
