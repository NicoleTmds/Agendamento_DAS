import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from '../../services/api.js';

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state && location.state.error) {
            setError(location.state.error);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    async function handleSubmit(event) {
        event.preventDefault()

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await api.post('http://localhost:3335/jaguar/auth/login', credentials, {
                withCredentials: true,
            });
            alert("Login realizado com sucesso!!")
            console.log(response.data);
            navigate('/');
        } catch (err) {
            alert("Senha ou e-mail Incorretos!!")
        }
    }

    return (
        <main>
            <div className="flex grow m-10 justify-center items-center" onSubmit={handleSubmit}>
                <div className="bg-white px-10 py-7 w-2/6 rounded-lg shadow-lg border border-gray-300">
                    <h2 className="text-2xl mb-5">Login</h2>

                    <form className="space-y-3 mb-8">
                        <label for="email" class="text-base block font-semibold text-gray-800">E-mail</label>
                        <input ref={emailRef} id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="E-mail" type="email" />

                        <label for="password" class="text-base block font-semibold text-gray-800">Senha</label>
                        <input ref={passwordRef} id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Senha" type="password" />
                        <div className="flex justify-center items-center">
                            <button className="bg-[rgb(15,34,45)] text-white py-2 px-10 mt-4 rounded-md hover:bg-[#D9D9D9] hover:text-[rgb(15,34,45)]">Fazer Login</button>
                        </div>
                    </form>
                    <Link to="/cadastro" className="flex justify-center text-blue-400">Não possui uma conta? Cadastre-se</Link>
                </div>
            </div>
        </main>
    )
}

export default Login