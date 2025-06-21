import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api.js';
import BackButton from '../../components/BackButton.jsx';

const TODOS_OS_HORARIOS = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
];

function Agendamento() {
    const navigate = useNavigate();

    // Estados para os dados do formulário
    const [paciente, setPaciente] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    // Estados para o fluxo de agendamento
    const [especialidades, setEspecialidades] = useState([]);
    const [selectedEspecialidade, setSelectedEspecialidade] = useState('');

    // Estados para o fluxo de medicos
    const [medicos, setMedicos] = useState([]);
    const [selectedMedico, setSelectedMedico] = useState('');

    // Estados para o fluxo de data
    const [selectedDate, setSelectedDate] = useState('');
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState('');

    // Estados para controle da UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        async function fetchEspecialidades() {
            try {
                const response = await api.get('/specialties');
                setEspecialidades(response.data);
            } catch (err) {
                setError("Não foi possível carregar as especialidades.");
            }
        }
        fetchEspecialidades();
    }, []);

    useEffect(() => {
        if (selectedEspecialidade) {
            async function fetchMedicos() {
                setMedicos([]); setSelectedMedico(''); setHorariosDisponiveis([]); setSelectedHorario('');
                try {
                    const response = await api.get(`/doctors?specialtyId=${selectedEspecialidade}`);
                    setMedicos(response.data);
                } catch (err) {
                    setError("Não foi possível carregar os médicos.");
                }
            }
            fetchMedicos();
        }
    }, [selectedEspecialidade]);

    useEffect(() => {
        if (selectedMedico && selectedDate) {
            async function fetchHorarios() {
                setHorariosDisponiveis([]);
                setSelectedHorario('');
                try {
                    const response = await api.get(`/doctors/${selectedMedico}/availability?date=${selectedDate}`);
                    setHorariosDisponiveis(response.data);
                } catch (err) {
                    setError("Não foi possível carregar os horários para esta data.");
                }
            }
            fetchHorarios();
        }
    }, [selectedMedico, selectedDate]);


    async function handleSubmit(event) {
        event.preventDefault();
        if (!selectedHorario) {
            setError("Por favor, selecione um horário disponível.");
            return;
        }
        setLoading(true);
        setError(null);
        const agendamentoData = {
            nomePaciente: paciente, cpfPaciente: cpf, emailPaciente: email, telefonePaciente: telefone,
            doctorId: selectedMedico, schedulingDate: selectedDate, schedulingTime: selectedHorario,
        };
        try {
            const response = await api.post('/schedulings', agendamentoData);
            

            setHorariosDisponiveis(
                prevHorarios => prevHorarios.filter(h => h !== selectedHorario)
            );
            
            setSuccessMessage(`Agendamento confirmado com sucesso para as ${selectedHorario} do dia ${selectedDate.split('-').reverse().join('/')}! Um e-mail de confirmação foi enviado para ${email}.`);
            setSelectedHorario(''); 

        } catch (err) {
            setError(err.response?.data?.message || "Erro ao realizar o agendamento.");
            // Se der erro 409 (conflito), podemos também forçar a atualização da UI
            if (err.response && err.response.status === 409) {
                 setHorariosDisponiveis(
                    prevHorarios => prevHorarios.filter(h => h !== selectedHorario)
                );
            }
        } finally {
            setLoading(false);
        }
    }


    function handleNewAppointment() {
        setSuccessMessage('');
        // Limpa todo o formulário
        setPaciente(''); setCpf(''); setEmail(''); setTelefone('');
        setSelectedEspecialidade(''); setMedicos([]);
        setSelectedMedico(''); setSelectedDate('');
        setHorariosDisponiveis([]); setSelectedHorario('');
    }

    if (successMessage) {
        return (
            <main>
                <div className="flex grow m-10 justify-center items-center">
                    <div className="bg-white px-10 py-7 w-2/6 rounded-lg shadow-lg border border-green-500 text-center">
                        <h2 className="text-2xl mb-4 text-green-700">Sucesso!</h2>
                        <p className="text-gray-800">{successMessage}</p>
                        <button onClick={handleNewAppointment} className="bg-[rgb(15,34,45)] text-white py-2 px-10 mt-6 rounded-md hover:bg-[#D9D9D9] hover:text-[rgb(15,34,45)]">
                            Fazer Novo Agendamento
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="flex grow m-10 justify-center items-center">
                <div className="bg-white px-10 py-7 w-2/6 rounded-lg shadow-lg border border-gray-300">
                    <BackButton />
                    <h2 className="text-2xl mb-8 text-center font-bold text-gray-800">Agendamento de Consultas</h2>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Seus Dados</h3>
                            <label htmlFor="paciente" className="text-base block font-semibold text-gray-800">Nome Completo</label>
                            <input value={paciente} onChange={e => setPaciente(e.target.value)} id="paciente" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)]" placeholder="Seu nome completo" type="text" />
                            <label htmlFor="cpf" className="text-base block font-semibold text-gray-800 mt-2">CPF</label>
                            <input value={cpf} onChange={e => setCpf(e.target.value)} id="cpf" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)]" placeholder="000.000.000-00" type="text" />
                            <label htmlFor="email" className="text-base block font-semibold text-gray-800 mt-2">E-mail</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} id="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)]" placeholder="seu-email@exemplo.com" type="email" />
                            <label htmlFor="telefone" className="text-base block font-semibold text-gray-800 mt-2">Telefone</label>
                            <input value={telefone} onChange={e => setTelefone(e.target.value)} id="telefone" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)]" placeholder="(82) 99999-9999" type="text" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3 mt-4">Dados da Consulta</h3>
                            <label htmlFor="especialidade" className="text-base block font-semibold text-gray-800">Especialidade</label>
                            <select value={selectedEspecialidade} onChange={e => setSelectedEspecialidade(e.target.value)} id="especialidade" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)] bg-white">
                                <option value="">Selecione uma especialidade</option>
                                {especialidades.map(esp => (<option key={esp.id} value={esp.id}>{esp.name}</option>))}
                            </select>
                            <label htmlFor="medico" className="text-base block font-semibold text-gray-800 mt-2">Médico(a)</label>
                            <select value={selectedMedico} onChange={e => setSelectedMedico(e.target.value)} id="medico" required disabled={!selectedEspecialidade || medicos.length === 0} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)] bg-white disabled:bg-gray-100">
                                <option value="">{selectedEspecialidade ? 'Selecione um(a) médico(a)' : 'Primeiro, escolha uma especialidade'}</option>
                                {medicos.map(med => (<option key={med.id} value={med.id}>{med.name}</option>))}
                            </select>
                            <label htmlFor="data" className="text-base block font-semibold text-gray-800 mt-2">Data da Consulta</label>
                            <input value={selectedDate} onChange={e => setSelectedDate(e.target.value)} id="data" type="date" required disabled={!selectedMedico} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(15,34,45)] disabled:bg-gray-100" />
                            <label htmlFor="horario" className="text-base block font-semibold text-gray-800 mt-2">Horário</label>
                            <div id="horario" className="grid grid-cols-4 gap-2 mt-2">
                                {TODOS_OS_HORARIOS.map(horario => {
                                    const isAvailable = horariosDisponiveis.includes(horario);
                                    const isSelected = selectedHorario === horario;
                                    return (
                                        <button key={horario} type="button" onClick={() => isAvailable && setSelectedHorario(horario)} disabled={!isAvailable} className={`py-2 px-1 rounded-md text-sm text-center transition-colors duration-200 ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'} ${isSelected ? 'bg-[rgb(15,34,45)] text-white ring-2 ring-offset-2 ring-[rgb(15,34,45)]' : ''} ${isAvailable && !isSelected ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''} ${!isAvailable ? 'bg-gray-200 text-gray-400 line-through' : ''}`}>
                                            {horario}
                                        </button>
                                    );
                                })}
                            </div>
                            {(!selectedDate && selectedMedico) && <p className="text-xs text-gray-500 mt-1">Selecione uma data para ver os horários.</p>}
                        </div>
                        <div className="flex justify-center items-center pt-4">
                            <button type="submit" disabled={loading || !selectedHorario} className="w-full bg-[rgb(15,34,45)] text-white py-3 px-10 rounded-md hover:bg-[#1f475c] disabled:bg-gray-400">
                                {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Agendamento;