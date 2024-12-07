import instagram from "../assets/logoMidia/instagram-circle.png"
import twitter from "../assets/logoMidia/twitter.png"
import telegram from "../assets/logoMidia/telegram-app.png"
import facebook from "../assets/logoMidia/facebook-f.png"
import tiktok from "../assets/logoMidia/tiktok.png"
import pinterest from "../assets/logoMidia/pinterest.png"
import security from "../assets/logoCards/image.png"

import { Link } from "react-router-dom"

// const images = import.meta.glob('../assets/logoMidia/*.png');

// const imagePaths = {};
// for (const path in images) {
//   images[path]().then((module) => {
//     imagePaths[path] = module.default;
//   });
// }

function Footer() {
  return (
    <footer className="bg-white text-white pt-6">
      <div className="bg-[rgb(15,34,45)] py-2 mt-6">

        <div className=" flex h-10">
          <div className="auto-cols-auto grow w-10">
            <div className="h-5 border-b"></div>
            <div className="h-5"></div>
          </div>

          <div className="flex h-10 justify-center items-center mx-20 gap-4">
            <img src={instagram} alt="logo instagram" className="w-6" />
            <img src={twitter} alt="logo twitter" className="w-6" />
            <img src={telegram} alt="logo telegram" className="w-6" />
            <img src={facebook} alt="logo facebook" className="w-6" />
            <img src={tiktok} alt="logo tiktok" className="w-6" />
            <img src={pinterest} alt="logo pinterest" className="w-6" />
          </div>

          <div className="auto-cols-auto grow w-10">
            <div className="h-5 border-b"></div>
            <div className="h-5"></div>
          </div>
        </div>

        <div className=" px-[15rem] my-2 mb-10 space-y-6 bg-[#6B7880]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-7">

            {/* 1 Coluna */}
            <div className="space-y-5 border-r my-5">
              <div>
                <h4 className="font-bold mb-1.5">Atendimento</h4>
                <ul className="space-y-1 text-sm ml-3">
                  <li><a href="#" className="hover:underline">Seg - Sex: 8h às 17h</a></li>
                  <li><a href="#" className="hover:underline">Sáb - Dom 9h às 16h</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1.5">Devoluções/Reenvios</h4>
                <ul className="space-y-1 text-sm ml-3">
                  <li><a href="#" className="hover:underline">Seg - Qui: 8h às 17h</a></li>
                  <li><a href="#" className="hover:underline">Sex - 9h às 16h</a></li>
                </ul>
              </div>
            </div>

            {/* 2 Coluna */}
            <div className="space-y-5 border-r my-5">
              <div>
                <h4 className="font-bold mb-1.5">Central de Ajuda</h4>
                <ul className="space-y-1 text-sm ml-3">
                  <li><a href="#" className="hover:underline">Central de Atendimento</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1.5">Pedidos e Entregas</h4>
                <ul className="space-y-1 text-sm ml-3">
                  <li><a href="#" className="hover:underline">Acompanhar Pedido</a></li>
                  <li><a href="#" className="hover:underline">Trocas e Devoluções</a></li>
                  <li><a href="#" className="hover:underline">Prazos e Entregas</a></li>
                  <li><a href="#" className="hover:underline">Histórico de Pedido</a></li>
                </ul>
              </div>
            </div>

            {/* 3 Coluna */}
            <div className="space-y-5 border-r my-5">
              <div>
                <h4 className="font-bold mb-1.5">Fale Conosco</h4>
                <ul className="space-y-1 text-sm ml-3 hover:underline">
                  <li><a href="#" className="">(82) 9 xxxx-xxxx</a></li>
                  <li><a href="#" className="hover:underline">Jaguar@gmail.com</a></li>
                  <li><a href="#" className="hover:underline">(82) xxxx-xxxx</a></li>
                </ul>
              </div>
              <div className="my-5">
                <h4 className="font-bold mb-1.5">Institucional</h4>
                <ul className="space-y-1 text-sm ml-3">
                  <li><a href="#" className="hover:underline">Quem Somos Nós</a></li>
                  <li><a href="#" className="hover:underline">Envie Uma Sugestão</a></li>
                  <li><a href="#" className="hover:underline">Políticas de Privacidade</a></li>
                </ul>
              </div>
            </div>

            {/* 4 Coluna */}
            <div className="space-y-5 my-5">
              <h4 className="font-bold mb-1.5">Compre com Segurança</h4>
              <img src={security} alt="Logo de segurança, forma de pagamento, e tipo de entrega" />
            </div>
          </div>

          <div className="flex justify-center p-2">
            <p className="text-sm">© 2024 Jaguar - Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer