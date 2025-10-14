import type { FilmApi } from "../organisms/InputPanel";
import FilmCard from "./FilmCard";

interface FilmListProps {
  films: FilmApi[];
  onSelect: (film: FilmApi) => void;
}

export default function FilmList({ films, onSelect }: FilmListProps) {
  console.log('films api' ,films);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {films.map((film) => (
        <FilmCard key={film.imdbID} film={film} onSelect={onSelect} />
      ))}
    </div>
  );
}
