import JaguarLogo from "../assets/logoJaguar/JaguarLogo.png"
import JaguarWhite from "../assets/logoJaguar/JaguarWhite.png"

import { Link } from "react-router-dom"

// const imagesNav = import.meta.glob('../assets/logoJaguar/*.png');

// const imagePathsNav = {};
// for (const path in imagesNav) {
//   imagesNav[path]().then((module) => {
//     imagePathsNav[path] = module.default;
//   });
// }

function Navbar() {
    return (
        <header className="bg-white text-[rgb(15,34,45)]">
            {/* Cabeçario */}
            <div className="mx-10 flex items-center justify-between h-7">
                <div className="flex grow w-14">
                    <img src={JaguarLogo} alt="logo jaguar" className="w-[5rem]" />
                </div>
                <div className="flex grow w-14 justify-center text-xs">
                    <p>Frete <span className='font-bold'>grátis</span> acima de <span className='font-bold'>R$199</span></p>
                </div>
                <div className="flex space-x-6 grow w-14 justify-end text-sm">
                    <Link to="">Central do Vendedor</Link>
                    <Link to="" className='border-x border-[rgb(15,34,45)] px-6'>Meus Pedidos</Link>
                    <Link to="">Atendimento</Link>
                </div>
            </div>

            {/* Menu */}
            <div className="bg-[rgb(15,34,45)] text-white flex justify-between p-1">
                <div className="flex grow w-1/2">

                    {/* Logo */}
                    <div className="flex grow w=1/3 justify-center">
                    {/* <img src={imagePathsNav['../assets/logoJaguar/JaguarWhite.png']} alt="logo jaguar branca" className="w-16" /> */}
                    <img src={JaguarWhite} alt="logo jaguar branca" className="w-16" />
                    </div>

                    {/* Barra de pesquisa */}
                    <div className="flex grow w-1/2 justify-center items-center">
                        <input type="text" placeholder="Pesquisar..." dir='ltr' className="w-full px-4 py-1 text-gray-700 focus:outline-none rounded-s-lg" />
                        <button
                            dir='rtl'
                            type='send'
                            className='rounded-s-lg py-1.5 px-1.5 bg-[#FFF5D0]'>
                            <svg class="h-5 w-5 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Botões de usuário e carrinho */}
                <div className="flex grow w-1/6 space-x-9 justify-end mr-20 items-center">
                    <div className='flex justify-between space-x-1.5'>
                        <svg class="h-6 w-6 text-[#FFF5D0]" fill="#FFF5D0" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <button className="">Minha Conta</button>
                    </div>
                    <Link to="">
                        <svg class="h-6 w-6 text-[#FFF5D0]" viewBox="0 0 24 24" fill="#FFF5D0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </Link>
                    <Link to="">
                        <svg class="h-6 w-6 text-[#FFF5D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </Link>
                </div>
            </div>

            {/* Área de Navegação */}
            <div className="flex grow p-1.5 items-center justify-center text-center">
                <nav className="flex space-x-48">
                    <a href="#" className="hover:underline">Feminino</a>
                    <a href="#" className="hover:underline">Masculino</a>
                    <a href="#" className="hover:underline">Lançamentos</a>
                    <a href="#" className="hover:underline">Coleções</a>
                    <a href="#" className="hover:underline">Acessórios</a>
                </nav>
            </div>
        </header >
    );
}

export default Navbar