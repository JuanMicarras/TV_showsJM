import { forwardRef } from 'react';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Usamos forwardRef para poder pasar el useRef desde el componente padre (Card) hasta este <dialog>
const ConfirmModal = forwardRef<HTMLDialogElement, ConfirmModalProps>(
  ({ title, message, onConfirm, onCancel }, ref) => {
    return (
      <dialog 
        ref={ref} 
        className="bg-slate-800 text-white p-0 rounded-xl shadow-2xl border border-slate-700 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm mx-auto my-auto open:flex flex-col max-w-sm w-full z-50"
      >
        <div className="p-6">
          <h3 className="text-xl font-black mb-3 text-center text-red-400">{title}</h3>
          <p className="text-slate-300 mb-6 text-center text-sm">{message}</p>
          
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Cancelar
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition"
            >
              Sí, quitar
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ConfirmModal;