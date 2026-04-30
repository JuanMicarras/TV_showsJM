import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import type { Show } from '../types/tvmaze';

interface ExploreProps {
  favorites: Show[];
  toggleFavorite: (show: Show) => void;
}

export default function Explore({ favorites, toggleFavorite }: ExploreProps) {
  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); 
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

  const allGenres = Array.from(new Set(shows.flatMap(show => show.genres))).sort();

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
        
        <FilterBar 
          search={search} setSearch={setSearch} 
          selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} 
          genres={allGenres} 
        />
      </div>

      {loading && <Loader message="Sintonizando canales..." />}
      {error && !loading && <ErrorMessage message={error} />}
      {!loading && !error && filteredShows.length === 0 && (
        <EmptyState message="No se encontraron series que coincidan con tus filtros." />
      )}
      {/* Grid */}
      {!loading && !error && filteredShows.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredShows.map((show) => (
            <Card 
              key={show.id} show={show} 
              isFavorite={favorites.some((fav) => fav.id === show.id)} 
              toggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
}