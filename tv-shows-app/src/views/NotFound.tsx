import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-black text-cyan-500 drop-shadow-lg mb-4">
        404
      </h1>
      <h2 className="text-3xl font-bold text-white mb-6">
        ¡Canal No Encontrado!
      </h2>
      <p className="text-xl text-slate-400 mb-10 max-w-lg">
        Parece que sintonizaste una frecuencia vacía o este programa fue cancelado. 
        Mejor cambiemos de canal y volvamos a la programación habitual.
      </p>
      <Link 
        to="/" 
        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
        Regresar al Inicio
      </Link>
    </div>
  );
}