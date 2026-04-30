import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Show } from '../types/tvmaze';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Badge from '../components/Badge';

interface DetailProps {
  favorites: Show[];
  toggleFavorite: (show: Show) => void;
}

export default function Detail({ favorites, toggleFavorite }: DetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=episodes`);
        
        if (response.status === 404) {
          throw new Error('Serie no encontrada (404)');
        }
        if (!response.ok) {
          throw new Error('Error al cargar los detalles');
        }
        
        const data = await response.json();
        setShow(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetail();
  }, [id]);

  if (loading) {
    return <Loader message="Procesando episodio..." />;
  }
  if (error || !show) {
    return (
      <div className="flex flex-col items-center">
        <ErrorMessage message={error || 'Señal perdida'} />
        <button onClick={() => navigate('/explore')} className="mt-4 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded transition">
          Volver a Explorar
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === show.id);
  const imageUrl = show.image?.original || show.image?.medium || 'https://via.placeholder.com/600x800?text=No+Image';

  const handleFavoriteClick = () => {
    toggleFavorite(show);
    if (isFavorite) {
      toast.error(`${show.name} eliminado de favoritos`);
    } else {
      toast.success(`${show.name} agregado a favoritos`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 mt-6">
      <div className="md:flex">
        {/* Lado izquierdo: Imagen */}
        <div className="md:w-1/3 md:shrink-0">
          <img src={imageUrl} alt={`Póster de ${show.name}`} className="h-full w-full object-cover md:h-full min-h-[400px]" />
        </div>
        
        {/* Lado derecho: Info */}
        <div className="p-8 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{show.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {show.genres.map(genre => (
                  <Badge key={genre} text={genre} />
                ))}
              </div>
            </div>
            
            {/* Rating destacado */}
            {show.rating?.average && (
              <div className="bg-cyan-900/50 border border-cyan-500/50 rounded-lg p-3 text-center min-w-[80px]">
                <span className="block text-2xl font-black text-cyan-400">{show.rating.average}</span>
                <span className="text-xs text-slate-400 uppercase">Rating</span>
              </div>
            )}
          </div>

          {/* Sinopsis */}
          <div 
            className="text-slate-300 prose prose-invert mb-6 overflow-y-auto max-h-40 pr-4 custom-scrollbar"
            dangerouslySetInnerHTML={{ __html: show.summary || '<p>No hay sinopsis disponible para esta serie.</p>' }}
          />

          {/* Cuadrícula de Metadatos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Estado</span>
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${show.status === 'Ended' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {show.status}
              </span>
            </div>
            
            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Idioma</span>
              <p className="text-slate-200 text-sm font-medium">{show.language || 'N/A'}</p>
            </div>

            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Cadena / Red</span>
              <p className="text-slate-200 text-sm font-medium">{show.network?.name || 'Streaming / Web'}</p>
            </div>

            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Duración</span>
              <p className="text-slate-200 text-sm font-medium">{show.runtime ? `${show.runtime} min` : 'N/A'}</p>
            </div>

            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Estreno</span>
              <p className="text-slate-200 text-sm font-medium">{show.premiered || 'N/A'}</p>
            </div>

            {show.schedule?.days?.length > 0 && (
              <div>
                <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Emisión</span>
                <p className="text-slate-200 text-sm font-medium">
                  {show.schedule.days.join(', ')} {show.schedule.time && `a las ${show.schedule.time}`}
                </p>
              </div>
            )}

            {/* Temporadas y Episodios desde el _embedded */}
            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Temporadas</span>
              <p className="text-slate-200 text-sm font-medium">
                {show._embedded?.seasons?.length || 'N/A'}
              </p>
            </div>

            <div>
              <span className="block text-slate-500 text-xs uppercase font-bold mb-1">Episodios</span>
              <p className="text-slate-200 text-sm font-medium">
                {show._embedded?.episodes?.length || 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleFavoriteClick}
              className={`flex-1 font-bold py-3 px-6 rounded transition flex items-center justify-center gap-2 ${isFavorite ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500/30' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
            >
              {isFavorite ? '★ En Favoritos' : '☆ Agregar a Favoritos'}
            </button>

            {show.officialSite && (
              <a 
                href={show.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded transition text-center flex items-center justify-center gap-2"
              >
                Sitio Oficial ↗
              </a>
            )}

            <button 
              onClick={() => navigate(-1)} 
              className="flex-1 bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 font-bold py-3 px-6 rounded transition"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}