export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-20">
      <p className="text-xl text-slate-400">{message}</p>
    </div>
  );
}