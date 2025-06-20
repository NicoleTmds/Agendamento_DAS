import { Link, NavLink } from "react-router-dom"; 

function Navbar() {
  return (
    <header className="bg-white text-[rgb(15,34,45)] shadow-md">
      <div className="mx-auto flex h-10 max-w-5xl items-center justify-between px-4">
      </div>

      {/* Menu de Navegação Principal */}
      <div className="bg-[rgb(15,34,45)] text-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-center px-4">
          <ul className="flex items-center space-x-8 text-sm font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 transition hover:text-teal-300 ${isActive ? 'border-b-2 border-teal-400' : ''}`
                }
              >
                Início
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/agendamento"
                className={({ isActive }) =>
                  `block px-3 py-2 transition hover:text-teal-300 ${isActive ? 'border-b-2 border-teal-400' : ''}`
                }
              >
                Novo Agendamento
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/meus-agendamentos"
                className={({ isActive }) =>
                  `block px-3 py-2 transition hover:text-teal-300 ${isActive ? 'border-b-2 border-teal-400' : ''}`
                }
              >
                Meus Agendamentos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/relatorio-admin"
                className={({ isActive }) =>
                  `block px-3 py-2 transition hover:text-teal-300 ${isActive ? 'border-b-2 border-teal-400' : ''}`
                }
              >
                Relatório (Admin)
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;