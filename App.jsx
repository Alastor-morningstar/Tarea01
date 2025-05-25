import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // <-- ¡Esto debe ser solo la URL base del servidor!
  headers: {
    'Content-Type': 'application/json',
  },
});

function ArticulosComponent() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDescripcion, setNewDescripcion] = useState('');
  const [newPrecio, setNewPrecio] = useState('');
  const [newExistencia, setNewExistencia] = useState('');

  // Cargar artículos al montar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await api.get('/articulos');
        setArticulos(response.data);
      } catch (err) {
        console.error('Error al obtener artículos:', err);
        setError('No se pudieron cargar los artículos.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticulos();
  }, []);

  // Función para agregar un nuevo artículo
  const handleAddArticulo = async () => {
    try {
      const response = await api.post('/articulos', {
        descripcion: newDescripcion,
        precio: parseFloat(newPrecio), // Asegúrate de enviar el tipo correcto
        existencia: parseInt(newExistencia, 10), // Asegúrate de enviar el tipo correcto
      });
      setArticulos([...articulos, response.data]); // Añadir el nuevo artículo a la lista
      // Limpiar campos
      setNewDescripcion('');
      setNewPrecio('');
      setNewExistencia('');
    } catch (err) {
      console.error('Error al agregar artículo:', err);
      setError('No se pudo agregar el artículo.');
    }
  };

  // Función para eliminar un artículo
  const handleDeleteArticulo = async (id) => {
    try {
      await api.delete(`/articulos/${id}`);
      setArticulos(articulos.filter(articulo => articulo.id !== id)); // Actualizar UI
    } catch (err) {
      console.error('Error al eliminar artículo:', err);
      setError('No se pudo eliminar el artículo.');
    }
  };

  if (loading) return <p>Cargando artículos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Gestión de Artículos</h1>

      {/* Formulario para agregar artículo */}
      <div>
        <h2>Agregar Nuevo Artículo</h2>
        <input
          type="text"
          placeholder="Descripción"
          value={newDescripcion}
          onChange={(e) => setNewDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newPrecio}
          onChange={(e) => setNewPrecio(e.target.value)}
        />
        <input
          type="number"
          placeholder="Existencia"
          value={newExistencia}
          onChange={(e) => setNewExistencia(e.target.value)}
        />
        <button onClick={handleAddArticulo}>Agregar Artículo</button>
      </div>

      <hr />

      {/* Lista de artículos */}
      <h2>Lista de Artículos</h2>
      {articulos.length === 0 ? (
        <p>No hay artículos para mostrar.</p>
      ) : (
        <ul>
          {articulos.map((articulo) => (
            <li key={articulo.id}>
              {articulo.descripcion} - ${articulo.precio} - {articulo.existencia} en stock
              <button onClick={() => handleDeleteArticulo(articulo.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticulosComponent;