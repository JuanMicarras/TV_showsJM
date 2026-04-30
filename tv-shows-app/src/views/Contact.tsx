import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Contact() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
  const isMessageValid = message.trim().length > 10;

  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      modalRef.current?.showModal();
    }
  };

  const handleConfirm = () => {
    modalRef.current?.close();
    toast.success('¡Comentarios enviados con éxito a la productora!');
    setName(''); setEmail(''); setMessage('');
    setTouched({ name: false, email: false, message: false });
    navigate('/');
  };

  const handleCancel = () => {
    modalRef.current?.close();
    toast.error('Envío abortado (y te suscribimos al Spam del canal)');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Atención al <span className="text-cyan-400">Espectador</span></h1>
        <p className="text-slate-400">Cuéntanos qué te parece nuestra programación</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700">
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-slate-300 font-bold mb-2">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 rounded bg-slate-900 border focus:outline-none transition ${
              touched.name && !isNameValid 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-600 focus:border-cyan-400'
            }`}
            placeholder="Walter White"
          />
          {touched.name && !isNameValid && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <span className="font-bold">⚠</span> El nombre debe tener al menos 2 letras.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-slate-300 font-bold mb-2">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 rounded bg-slate-900 border focus:outline-none transition ${
              touched.email && !isEmailValid 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-600 focus:border-cyan-400'
            }`}
            placeholder="espectador@tvmaze.com"
          />
          {touched.email && !isEmailValid && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <span className="font-bold">⚠</span> Ingresa un correo electrónico válido (ej. usuario@dominio.com).
            </p>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="message" className="block text-slate-300 font-bold mb-2">Mensaje</label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleBlur('message')}
            className={`w-full px-4 py-3 rounded bg-slate-900 border focus:outline-none transition ${
              touched.message && !isMessageValid 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-600 focus:border-cyan-400'
            }`}
            placeholder="Me gustaría recomendar una serie..."
          ></textarea>
          {touched.message && !isMessageValid && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <span className="font-bold">⚠</span> El mensaje debe tener más de 10 caracteres.
            </p>
          )}
        </div>

        {/* El botón está deshabilitado si isFormValid es false */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full font-bold py-3 px-4 rounded transition-all ${
            isFormValid 
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-70'
          }`}
        >
          Enviar Comentarios
        </button>
      </form>

      <dialog 
        ref={modalRef} 
        className="bg-slate-800 text-white p-0 rounded-xl shadow-2xl border border-slate-700 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm mx-auto my-auto open:flex flex-col max-w-md w-full"
      >
        <div className="p-6">
          <h3 className="text-2xl font-black mb-4 text-center">¿Confirmar envío?</h3>
          <p className="text-slate-300 mb-8 text-center">
            Estás a punto de enviar tus comentarios a nuestra central de transmisión.
          </p>
          
          <div className="flex flex-col gap-4">
            {/* 
              DARK PATTERN INTENCIONAL: 
              Jerarquía visual invertida y "Confirmshaming".
              El botón de cancelar está diseñado como el botón de acción principal (verde/brillante) 
              y engaña al usuario diciendo que aceptará correos de Spam. 
              El botón de enviar (la acción deseada real) se esconde visualmente como un texto gris.
            */}
            <button 
              onClick={handleCancel}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black py-4 px-4 rounded-lg transition"
            >
              ¡SÍ! CANCELAR EL MENSAJE Y SUSCRIBIRME AL SPAM DIARIO 
            </button>
            
            <button 
              onClick={handleConfirm}
              className="w-full text-slate-500 hover:text-slate-300 text-sm font-medium py-2 underline transition"
            >
              No, prefiero continuar y enviar mi mensaje aburrido.
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}