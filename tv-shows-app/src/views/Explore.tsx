import { useState, useEffect } from 'react';
import Card from '../components/Card';
import type { Show } from '../types/tvmaze';

interface ExploreProps {
  favorites: Show[];
  toggleFavorite: (show: Show) => void;
}

export default function Explore({ favorites, toggleFavorite }: ExploreProps) {
  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch de la lista de series al montar el componente
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        // Traemos las primeras series de la API
        const response = await fetch('https://api.tvmaze.com/shows');
        if (!response.ok) throw new Error('Error al cargar las series');
        
        const data = await response.json();
        
        setShows(data.slice(0, 500)); 
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // Filtrado en tiempo real basado en el estado 'search'
  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Encabezado y Buscador */}
      <div role="search" className="mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Explorar <span className="text-cyan-400">Series</span></h1>
        <p className="text-slate-400 mb-6">Encuentra tus series favoritas de la API</p>
        
        <input
          type="text"
          placeholder="Buscar serie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition"
        />
      </div>

      {/* Renderizado Condicional de Estados (Loading, Error, Empty, Éxito) */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mb-4"></div>
          <p className="text-slate-400">Sintonizando canales...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-20 bg-red-900/20 border border-red-500/50 rounded-xl">
          <span className="text-4xl block mb-2">⚠️</span>
          <h2 className="text-xl font-bold text-red-400 mb-1">¡Señal Interrumpida!</h2>
          <p className="text-slate-300">{error}</p>
        </div>
      )}

      {/* Empty State: Cuando la búsqueda no coincide con nada */}
      {!loading && !error && filteredShows.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-slate-400">No se encontraron series que coincidan con "{search}"</p>
        </div>
      )}

      {/* Grid de Resultados */}
      {!loading && !error && filteredShows.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredShows.map((show) => {
            const isFavorite = favorites.some((fav) => fav.id === show.id);
            return (
              <Card 
                key={show.id} 
                show={show} 
                isFavorite={isFavorite} 
                toggleFavorite={toggleFavorite} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}