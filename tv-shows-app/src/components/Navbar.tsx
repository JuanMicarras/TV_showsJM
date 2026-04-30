import { NavLink } from 'react-router-dom';

export default function Navbar() {

  const linkClasses = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1" 
      : "text-slate-300 hover:text-cyan-400 transition pb-1";

  return (
    <nav className="bg-slate-950 p-4 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        

        <div className="flex items-center gap-2 text-2xl font-black text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
            <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/>
            <polyline points="17 2 12 7 7 2"/>
          </svg>
          TV<span className="text-cyan-400">Explorer</span>
        </div>

        <div className="flex gap-6">
          <NavLink to="/" className={linkClasses}>Inicio</NavLink>
          <NavLink to="/explore" className={linkClasses}>Explorar</NavLink>
          <NavLink to="/favorites" className={linkClasses}>Favoritos</NavLink>
          <NavLink to="/contact" className={linkClasses}>Contacto</NavLink>
        </div>
        
      </div>
    </nav>
  );
}