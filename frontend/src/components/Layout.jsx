import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="">
        {children} {/* Renderiza o conteúdo da rota, como o Cadastro */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout