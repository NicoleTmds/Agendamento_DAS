import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)} // O -1 significa "volte para a página anterior no histórico"
            className="mb-4 text-sm text-gray-600 hover:text-black"
        >
            &larr; Voltar
        </button>
    );
}

export default BackButton;