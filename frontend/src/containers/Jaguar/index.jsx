import { useState, useEffect } from 'react';
import api from '../../services/api.js';

function ListarProdutos() {
  const [products, setProducts] = useState([]);
  
  // Função para buscar os produtos
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const response = await api.get('http://localhost:3335/jaguar/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const moveCarousel = (direction) => {
    const carousel = document.getElementById('carousel');
    const totalWidth = carousel.scrollWidth;
    const itemWidth = carousel.offsetWidth;
    const currentPosition = carousel.scrollLeft;

    let newPosition = currentPosition + direction * itemWidth;

    if (newPosition < 0) newPosition = 0;
    if (newPosition > totalWidth - itemWidth) newPosition = totalWidth - itemWidth;

    carousel.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveCarousel(1); // Move para a direita
    }, 5000); // A cada 5 segundos
    
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="container mx-auto mt-8">
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="relative">
          {/* Carrossel */}
          <div className="overflow-hidden relative">
            <div className="flex transition-transform duration-300" id="carousel">
              {products.map((product) => (
                <div className="w-full flex-shrink-0" key={product.id}>
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-sm p-2 w-full text-center">
                      {product.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles do carrossel */}
          <button
            onClick={() => moveCarousel(-1)}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black p-2"
          >
            &#60;
          </button>
          <button
            onClick={() => moveCarousel(1)}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black p-2"
          >
            &#62;
          </button>
        </div>
      )}
    </div>
  );
}

export default ListarProdutos;
