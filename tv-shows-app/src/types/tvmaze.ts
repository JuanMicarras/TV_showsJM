
export interface Show {
  id: number;
  name: string;
  genres: string[];
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
}

// La API de TVMaze cuando buscas un show devuelve un objeto con el show adentro
export interface ShowSearchResult {
  score: number;
  show: Show;
}