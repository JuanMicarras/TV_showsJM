interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  genres: string[];
}

export default function FilterBar({ search, setSearch, selectedGenre, setSelectedGenre, genres }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Buscar serie por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-3 rounded bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition"
      />
      
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="px-4 py-3 rounded bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 transition cursor-pointer"
      >
        <option value="">Todos los géneros</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
}