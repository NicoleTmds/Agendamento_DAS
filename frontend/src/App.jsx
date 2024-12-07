import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Cadastro from "./containers/Cadastro"
import Login from "./containers/Login"
import Jaguar from "./containers/Jaguar"



function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/cadastro" element={<Layout><Cadastro /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/" element={<Layout><Jaguar /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
