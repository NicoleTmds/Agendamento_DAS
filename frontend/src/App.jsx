import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import BackButton from "./components/BackButton"
import Home from "./containers/Home"
import Agendamento from "./containers/Agendamento"
import MeusAgendamentos from "./containers/MeusAgendamentos"
import RelatorioAdmin from "./containers/RelatorioAdmin"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas filhas que serão renderizadas dentro do Layout */}
          {/* Usando caminhos em minúsculo como convenção */}
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="meus-agendamentos" element={<MeusAgendamentos />} />
          <Route path="relatorio-admin" element={<RelatorioAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
