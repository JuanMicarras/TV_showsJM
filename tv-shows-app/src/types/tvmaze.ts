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
  language: string;
  status: string;
  runtime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  network: {
    name: string;
  } | null;
  
  _embedded?: {
    seasons?: any[];
    episodes?: any[];
  };
}

export interface ShowSearchResult {
  score: number;
  show: Show;
}