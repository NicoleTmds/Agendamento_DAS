import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import BackButton from '../../components/BackButton.jsx';

function RelatorioAdmin() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // Função para buscar os dados do relatório
    const fetchReport = async () => {
        if (selectedDate) {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/schedulings/report?date=${selectedDate}`);
                setAgendamentos(response.data);
            } catch (err) {
                setError("Não foi possível carregar o relatório para esta data.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Busca o relatório quando a data muda
    useEffect(() => {
        fetchReport();
    }, [selectedDate]);


    // Função para cancelar um agendamento
    const handleCancel = async (agendamentoId) => {
        if (!window.confirm("Você tem certeza que deseja cancelar este agendamento?")) {
            return;
        }
        try {
            await api.patch(`/schedulings/${agendamentoId}/cancel`);
            // Após cancelar com sucesso, busca os dados novamente para atualizar a tabela
            fetchReport();
        } catch (err) {
            setError("Não foi possível cancelar o agendamento.");
        }
    };

    // A função de exportar CSV
    const handleExportCsv = () => {
        const exportUrl = `${api.defaults.baseURL}/schedulings/report/export/csv?date=${selectedDate}`;
        window.open(exportUrl, '_blank');
    };

    // Função para gerar PDF de um único agendamento
    const handleGeneratePdf = (agendamentoId) => {
        const pdfUrl = `${api.defaults.baseURL}/schedulings/${agendamentoId}/pdf`;
        window.open(pdfUrl, '_blank');
    };

    return (
        <main>
            <div className="flex grow m-10 justify-center items-start">
                <div className="bg-white px-10 py-7 w-5/6 max-w-5xl rounded-lg shadow-lg border border-gray-300">
                    <BackButton />
                    <h2 className="text-2xl mb-8 text-center font-bold text-gray-800">Relatório de Agendamentos</h2>

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <label htmlFor="dataRelatorio" className="font-semibold mr-2">Selecione a Data:</label>
                            <input
                                id="dataRelatorio"
                                type="date"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)]"
                            />
                        </div>
                        <div className="space-x-2">
                            <button onClick={handleExportCsv} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm">Exportar Lista (CSV)</button>
                        </div>
                    </div>

                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md my-4 text-sm">{error}</p>}

                    {loading ? (
                        <p className="text-center text-gray-500 py-4">Carregando relatório...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Paciente</th>
                                        <th className="py-2 px-4 border-b text-left">Contato</th>
                                        <th className="py-2 px-4 border-b text-left">Especialidade</th>
                                        <th className="py-2 px-4 border-b text-left">Médico(a)</th>
                                        <th className="py-2 px-4 border-b text-left">Horário</th>
                                        <th className="py-2 px-4 border-b text-left">Status</th>
                                        <th className="py-2 px-4 border-b text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agendamentos.length > 0 ? (
                                        agendamentos.map(ag => (
                                            <tr key={ag.id}>
                                                <td className="py-2 px-4 border-b">{ag.users.name}</td>
                                                <td className="py-2 px-4 border-b">{ag.users.telefone}</td>
                                                <td className="py-2 px-4 border-b">{ag.doctors.specialties.name}</td>
                                                <td className="py-2 px-4 border-b">{ag.doctors.name}</td>
                                                <td className="py-2 px-4 border-b">{ag.schedulingTime}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${ag.status.toLowerCase() === 'agendado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>{ag.status}</span>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            onClick={() => handleGeneratePdf(ag.id)}
                                                            className="text-xs bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
                                                            title="Gerar Comprovante em PDF"
                                                        >
                                                            PDF
                                                        </button>
                                                        {(ag.status.toLowerCase() === 'agendado') && (
                                                            <button
                                                                onClick={() => handleCancel(ag.id)}
                                                                className="text-xs bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 text-gray-500">Nenhum agendamento para esta data.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default RelatorioAdmin;