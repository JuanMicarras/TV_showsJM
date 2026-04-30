export default function Badge({ text }: { text: string }) {
  return (
    <span className="bg-slate-700 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full">
      {text}
    </span>
  );
}