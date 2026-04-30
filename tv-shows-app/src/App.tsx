import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import type { Show } from './types/tvmaze';
import Navbar from './components/Navbar';
import Home from './views/Home';

// import Explore from './views/Explore';
// import Detail from './views/Detail';
// import Favorites from './views/Favorites';
// import Contact from './views/Contact';
// import NotFound from './views/NotFound';

function App() {
  // Inicializamos el estado usando TypeScript para decirle que es un array de objetos "Show"
  const [favorites, setFavorites] = useState<Show[]>(() => {
    const saved = localStorage.getItem('tvmaze-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cuando cambien los favoritos
  useEffect(() => {
    localStorage.setItem('tvmaze-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Función tipada para agregar/quitar favoritos
  const toggleFavorite = (show: Show) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.id === show.id);
      if (isFavorited) {
        return prevFavorites.filter((fav) => fav.id !== show.id);
      } else {
        return [...prevFavorites, show];
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Navbar /> 
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/explore" element={<Explore favorites={favorites} toggleFavorite={toggleFavorite} />} /> */}
          {/* <Route path="/show/:id" element={<Detail favorites={favorites} toggleFavorite={toggleFavorite} />} /> */}
          {/* <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */} 
        </Routes>
      </main>

      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;