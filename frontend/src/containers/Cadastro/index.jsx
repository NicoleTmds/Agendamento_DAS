import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from '../../services/api.js';

function Cadastro() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);  // Gerenciar o erro do login
    const roleRef = useRef();
    const nameRef = useRef();
    const dataNascimentoRef = useRef();
    const cpfRef = useRef();
    const rgRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Verificando se há erros no estado da localização
    useEffect(() => {
        if (location.state && location.state.error) {
            setError(location.state.error);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    // Função de envio de cadastro
    async function handleSubmit(event) {
        event.preventDefault();

        const credentials = {
            role: roleRef.current.value,
            name: nameRef.current.value,
            birthDate: dataNascimentoRef.current.value,
            cpf: cpfRef.current.value,
            rg: rgRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await api.post('/jaguar/auth/cadastro', credentials, {
                withCredentials: true,
            });
            alert("Cadastro realizado com sucesso!");
            console.log(response.data);
            navigate('/');
        } catch (err) {
            alert("Erro ao cadastrar usuário");
            console.error(err);
        }
    }

    return (
        <main>
            <div className="flex grow m-10 justify-center items-center">
                <div className="bg-white px-10 py-7 w-2/6 rounded-lg shadow-lg border border-gray-300">
                    <h2 className="text-2xl mb-5">Cadastrar</h2>

                    <div className="flex mb-8">
                        <div dir="ltr" className="bg-[#D9D9D9] grow px-5 py-3 rounded-s-lg text-center drop-shadow-lg">
                            <h2>Pessoa Física</h2>
                        </div>
                        <div dir="rtl" className="border-t border-b border-r border-gray-300 grow px-5 py-3 rounded-s-lg text-center">
                            <h2>Pessoa Jurídica</h2>
                        </div>
                    </div>

                    <form className="space-y-3 mb-5" onSubmit={handleSubmit}>
                        <label for="conta" class="text-base mt-3 font-semibold text-gray-800">Tipo de Conta</label>
                        <select ref={roleRef} id="conta" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                            <option selected value="BUYER">Comprador</option>
                            <option value="SELLER">Vendedor</option>
                        </select>
                        <label for="nome" class="text-base block font-semibold text-gray-800">Nome</label>
                        <input ref={nameRef} id="nome" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Nome" type="text" />

                        <label for="data_nascimento" class="text-base block font-semibold text-gray-800">Data de Nascimento</label>
                        <input ref={dataNascimentoRef} id="data_nascimento" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Data de Nascimento" type="date" />

                        <label for="cpf" class="text-base block font-semibold text-gray-800">CPF</label>
                        <input ref={cpfRef} id="cpf" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="CPF" type="text" />

                        <label for="rg" class="text-base block font-semibold text-gray-800">RG</label>
                        <input ref={rgRef} id="rg" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="RG" type="text" />

                        <label for="email" class="text-base block font-semibold text-gray-800">E-mail</label>
                        <input ref={emailRef} id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="E-mail" type="email" />

                        <label for="password" class="text-base block font-semibold text-gray-800">Senha</label>
                        <input ref={passwordRef} id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Senha" type="password" />

                        {/* <label for="confirm_password" class="text-base block font-semibold text-gray-800">Confirmar Senha</label>
                        <input ref={confirmPasswordRef} id="confirm_password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Confirmar Senha" type="password" /> */}

                        <div className="flex justify-center items-center">
                            <button className="bg-[rgb(15,34,45)] text-white py-2 px-10 mt-4 rounded-md hover:bg-[#D9D9D9] hover:text-[rgb(15,34,45)]">Cadastrar-se</button>
                        </div>
                    </form>
                    <Link to="/login" className="flex justify-center text-blue-400">Já tem uma conta? Faça login</Link>
                </div>
            </div>
        </main>
    )

}

export default Cadastro