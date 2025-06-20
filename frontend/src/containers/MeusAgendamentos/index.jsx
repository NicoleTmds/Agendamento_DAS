import React, { useState } from 'react';
import api from '../../services/api.js';
import BackButton from '../../components/BackButton.jsx';

function MeusAgendamentos() {
    const [identifier, setIdentifier] = useState('');
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    async function handleSearch(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSearched(true);
        setAgendamentos([]);
        try {
            const response = await api.get(`/schedulings?identifier=${identifier}`);
            setAgendamentos(response.data);
        } catch (err) {
            setError("Nenhum agendamento encontrado ou erro na busca. Verifique o dado informado.");
        } finally {
            setLoading(false);
        }
    }


    async function handleCancel(agendamentoId) {
        // Pede a confirmação do usuário para o cancelamento
        if (!window.confirm("Você tem certeza que deseja cancelar este agendamento?")) {
            return;
        }

        // Salva o estado atual para poder reverter em caso de erro
        const originalAgendamentos = [...agendamentos];

        // Atualiza a interface imediatamente para o usuário ver a mudança (Optimistic Update)
        const novosAgendamentos = agendamentos.map(ag =>
            ag.id === agendamentoId ? { ...ag, status: 'Cancelada' } : ag
        );
        setAgendamentos(novosAgendamentos);

        try {
            // Chama a rota PATCH no back-end
            await api.patch(`/schedulings/${agendamentoId}/cancel`);
            // Se a API confirmar, a UI já está correta.
        } catch (err) {
            setError("Não foi possível cancelar o agendamento. Tente novamente.");
            // Se a API falhar, reverte a mudança na UI para o estado original
            setAgendamentos(originalAgendamentos);
        }
    }

    return (
        <main>
            <div className="flex grow m-10 justify-center items-start">
                <div className="bg-white px-10 py-7 w-3/6 rounded-lg shadow-lg border border-gray-300">
                    <BackButton />
                    <h2 className="text-2xl mb-8 text-center font-bold text-gray-800">Gerenciar Meus Agendamentos</h2>

                    <form onSubmit={handleSearch} className="flex items-center gap-4 mb-8">
                        <input
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)]"
                            placeholder="Digite seu e-mail ou CPF"
                            type="text"
                        />
                        <button type="submit" disabled={loading} className="bg-[rgb(15,34,45)] text-white py-2 px-6 rounded-md hover:bg-[#1f475c] disabled:bg-gray-400 whitespace-nowrap">
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </form>

                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}

                    <div className="space-y-4">
                        {agendamentos.length > 0 ? (
                            agendamentos.map(ag => (
                                <div key={ag.id} className="p-4 border rounded-md shadow-sm flex justify-between items-center">
                                    <div>
                                        {/* Acessando os dados com os aliases corretos */}
                                        <p className="font-bold text-lg">{ag.doctors.specialties.name}</p>
                                        <p className="text-gray-600">Com {ag.doctors.name}</p>
                                        <p className="text-gray-600">Em: {new Date(ag.schedulingDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} às {ag.schedulingTime}</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${ag.status.toLowerCase() === 'agendada' || ag.status.toLowerCase() === 'agendado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>{ag.status}</span>

                                        {(ag.status.toLowerCase() === 'agendada' || ag.status.toLowerCase() === 'agendado') && (
                                            <button
                                                onClick={() => handleCancel(ag.id)}
                                                className="mt-2 text-sm bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            searched && !loading && <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MeusAgendamentos;