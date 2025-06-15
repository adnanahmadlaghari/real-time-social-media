import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import { Box, useTheme } from "@mui/material"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Login from "./pages/Login"


function App() {

  const theme = useTheme()

  return (
    <Box sx={{
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
      height: "100vh",
      width: "100vw",
      boxSizing: "border-box"
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Box >
  )
}

export default App
