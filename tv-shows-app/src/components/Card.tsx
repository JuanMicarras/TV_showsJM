import { useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import type { Show } from '../types/tvmaze';

interface CardProps {
  show: Show;
  isFavorite: boolean;
  toggleFavorite: (show: Show) => void;
}

export default function Card({ show, isFavorite, toggleFavorite }: CardProps) {
  // Referencia para el modal de confirmación
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      // Si ya es favorito, mostramos el modal llamando al método nativo
      modalRef.current?.showModal();
    } else {
      // Si no es favorito, lo agregamos directamente
      toggleFavorite(show);
      toast.success(`${show.name} agregado a favoritos`);
    }
  };

  const handleConfirmRemove = () => {
    toggleFavorite(show);
    toast.error(`${show.name} eliminado de favoritos`);
    modalRef.current?.close(); 
  };

  const handleCancelRemove = () => {
    modalRef.current?.close(); 
  };

  const imageUrl = show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all flex flex-col h-full border border-slate-700 relative">
      
      <button 
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-full hover:bg-slate-700 transition z-10"
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#eab308" : "none"} stroke={isFavorite ? "#eab308" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isFavorite ? "" : "text-white"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      <img src={imageUrl} alt={`Póster de ${show.name}`} className="w-full h-64 object-cover" />
      
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-white mb-1 line-clamp-1">{show.name}</h2>
        <p className="text-sm text-slate-400 mb-3 line-clamp-1">
          {show.genres.join(', ') || 'Sin género definido'}
        </p>
        
        <Link 
          to={`/show/${show.id}`} 
          className="mt-auto block w-full text-center bg-slate-700 hover:bg-cyan-500 hover:text-slate-950 text-white font-semibold py-2 rounded transition-colors"
        >
          Ver Detalles
        </Link>
      </div>

      
      <ConfirmModal 
        ref={modalRef}
        title="¿Quitar de Favoritos?"
        message={`¿Estás seguro de que deseas eliminar "${show.name}" de tu lista de maratón?`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </div>
  );
}