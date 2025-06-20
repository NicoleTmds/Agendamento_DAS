import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <main>
            <div className="flex grow m-10 justify-center items-center">
                {/* Estrutura de card padronizada */}
                <div className="bg-white px-10 py-12 w-2/6 rounded-lg shadow-lg border border-gray-300 text-center">
                    
                    <h2 className="text-3xl mb-4 font-bold text-gray-800">
                        Sistema de Agendamento
                    </h2>
                    <p className="text-gray-600 mb-10">
                        Bem-vindo(a). Escolha uma das opções abaixo para continuar.
                    </p>

                    <div className="space-y-4 flex flex-col items-center">
                        {/* Botões de navegação com o mesmo estilo */}
                        <Link to="/agendamento" className="w-full max-w-xs bg-[rgb(15,34,45)] text-white py-3 px-10 rounded-md hover:bg-[#1f475c] text-center">
                            Agendar Nova Consulta
                        </Link>

                        <Link to="/meus-agendamentos" className="w-full max-w-xs bg-[rgb(15,34,45)] text-white py-3 px-10 rounded-md hover:bg-[#1f475c] text-center">
                            Gerenciar Meus Agendamentos
                        </Link>

                        <Link to="/relatorio-admin" className="w-full max-w-xs bg-[rgb(15,34,45)] text-white py-3 px-10 rounded-md hover:bg-[#1f475c] text-center">
                            Relatório Administrativo
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Home;