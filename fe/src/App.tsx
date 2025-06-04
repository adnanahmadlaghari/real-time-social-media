import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
