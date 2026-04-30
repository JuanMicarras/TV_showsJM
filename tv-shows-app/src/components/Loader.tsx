export default function Loader({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mb-4"></div>
      <p className="text-slate-400">{message}</p>
    </div>
  );
}