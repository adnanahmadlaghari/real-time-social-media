import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import { Box, useTheme } from "@mui/material"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useGlobalVar } from "./components/Global/Global"


function App() {

  const theme = useTheme()
  const {isToken} = useGlobalVar()

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
            <Route index element={isToken ? <Dashboard /> : <Navigate to="/auth/signin" replace />} />
            <Route path="/chat" element={isToken ? <Chat /> : <Navigate to="/auth/signin" replace />} />
            <Route path="/profile" element={isToken ? <Profile /> : <Navigate to="/auth/signin" replace />} />
          </Route>
          <Route path="/auth/register" element={isToken ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/auth/signin" element={isToken ? <Navigate to="/" replace /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </Box >
  )
}

export default App
