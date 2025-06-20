import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./containers/Home"
import Agendamento from "./containers/Agendamento"
import MeusAgendamentos from "./containers/MeusAgendamentos"
import RelatorioAdmin from "./containers/RelatorioAdmin"


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="meus-agendamentos" element={<MeusAgendamentos />} />
          <Route path="relatorio-admin" element={<RelatorioAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

