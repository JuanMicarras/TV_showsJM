import Card from '../components/Card';
import type { Show } from '../types/tvmaze';

interface FavoritesProps {
  favorites: Show[];
  toggleFavorite: (show: Show) => void;
}

export default function Favorites({ favorites, toggleFavorite }: FavoritesProps) {
  return (
    <div>
      <div className="mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Tus <span className="text-cyan-400">Favoritos</span></h1>
        <p className="text-slate-400">Las series que tienes guardadas en tu bóveda</p>
      </div>

      {/* Estado Empty: Cuando el array de favoritos está vacío */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 mb-4">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <h2 className="text-xl font-bold text-slate-300 mb-2">No hay favoritos guardados</h2>
          <p className="text-slate-500">Explora el catálogo y guarda algunas series para tu próxima maratón.</p>
        </div>
      ) : (
        /* Reutilizamos el componente Card para mostrar los favoritos */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((show) => (
            <Card 
              key={show.id} 
              show={show} 
              // Como estamos en la vista de favoritos, siempre es true aquí
              isFavorite={true} 
              toggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
}