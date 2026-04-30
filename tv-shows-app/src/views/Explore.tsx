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
  const [selectedGenre, setSelectedGenre] = useState(''); // <-- Nuevo estado para el filtro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.tvmaze.com/shows');
        if (!response.ok) throw new Error('Error al cargar las series');
        
        const data = await response.json();
        setShows(data.slice(0, 50)); 
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // Extraemos todos los géneros únicos de las series cargadas para armar el <select>
  const allGenres = Array.from(new Set(shows.flatMap(show => show.genres))).sort();

  // Búsqueda Y Filtrado combinados
  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === '' || show.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <div role="search" className="mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Explorar <span className="text-cyan-400">Series</span></h1>
        <p className="text-slate-400 mb-6">Encuentra y filtra tus series favoritas</p>
        
        {/* Contenedor Flex para alinear el input y el select */}
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Buscar serie por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition"
          />
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-3 rounded bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition cursor-pointer"
          >
            <option value="">Todos los géneros</option>
            {allGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

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

      {!loading && !error && filteredShows.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-slate-400">No se encontraron series que coincidan con tus filtros.</p>
        </div>
      )}

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