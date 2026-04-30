export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-20 bg-red-900/20 border border-red-500/50 rounded-xl max-w-2xl mx-auto mt-10">
      <span className="text-4xl block mb-2">⚠️</span>
      <h2 className="text-xl font-bold text-red-400 mb-2">¡Señal Interrumpida!</h2>
      <p className="text-slate-300">{message}</p>
    </div>
  );
}