import React, { useState, useEffect } from 'react'
import { Table, Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`http://localhost:3335/api/v1/products`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login', { state: { error: 'Você precisa estar autenticado para acessar esta página.' } });
      } else {
        console.error('Error fetching categories:', error);
      }
    }
  }

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`http://localhost:3335/api/v1/products/${id}`, {
          withCredentials: true,
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      <h2>Produtos</h2>
      <Link to="/products/new" className="btn btn-primary mb-3">Criar Produto</Link>
      {products.length === 0 ? (
        <p>No products found. Try adding some!</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Estoque</th>
              <th>Preço</th>
              <th>Expiração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image src={product.productImage} alt={product.name} width={50} height={50} rounded />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.inStock ? 'Yes' : 'No'}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{new Date(product.expiryDate).toLocaleDateString()}</td>
                <td>
                  <Link to={`/products/edit/${product.id}`} className="btn btn-sm btn-info me-2">Editar</Link>
                  <Button variant="danger" size="sm" onClick={() => deleteProduct(product.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}