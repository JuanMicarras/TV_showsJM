import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Estilos para los enlaces en versión Desktop
  const desktopLinkClasses = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1" 
      : "text-slate-300 hover:text-cyan-400 transition pb-1";

  // Estilos para los enlaces en versión Móvil (más como botones)
  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block text-cyan-400 font-bold bg-slate-800 rounded px-4 py-3"
      : "block text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded px-4 py-3 transition";

  return (
    <nav className="bg-slate-950 p-4 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-black text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
            <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/>
            <polyline points="17 2 12 7 7 2"/>
          </svg>
          TV<span className="text-cyan-400">Explorer</span>
        </div>

        {/* Botón Hamburguesa (Solo visible en Móvil -> md:hidden) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none"
          aria-label="Abrir menú"
        >
          {/* SVG Inline que cambia entre Hamburguesa (☰) y X (✕) */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Enlaces versión Computadora/Tablet (Ocultos en móvil -> hidden md:flex) */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={desktopLinkClasses}>Inicio</NavLink>
          <NavLink to="/explore" className={desktopLinkClasses}>Explorar</NavLink>
          <NavLink to="/favorites" className={desktopLinkClasses}>Favoritos</NavLink>
          <NavLink to="/contact" className={desktopLinkClasses}>Contacto</NavLink>
        </div>
      </div>

      {/* Menú Desplegable versión Móvil */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 pb-2">
          {/* Al hacer clic en cualquier enlace, cerramos el menú (setIsOpen(false)) */}
          <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Inicio</NavLink>
          <NavLink to="/explore" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Explorar</NavLink>
          <NavLink to="/favorites" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Favoritos</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Contacto</NavLink>
        </div>
      )}
    </nav>
  );
}