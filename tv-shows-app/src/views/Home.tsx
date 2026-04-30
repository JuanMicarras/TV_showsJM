import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
        Descubre tu Próxima <span className="text-cyan-400">Maratón</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
        Explora el catálogo más completo de series de televisión. Busca tus programas favoritos, descubre nuevos géneros y arma tu propia lista de series por ver.
      </p>
      
      {/* Botón que redirige a la página de exploración */}
      <Link 
        to="/explore" 
        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
      >
        Explorar Series
      </Link>
    </div>
  );
}