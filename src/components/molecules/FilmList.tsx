import type { FilmApi } from "../organisms/InputPanel";
import FilmCard from "./FilmCard";

interface FilmListProps {
  films: FilmApi[];
  onSelect: (film: FilmApi) => void;
}

export default function FilmList({ films, onSelect }: FilmListProps) {
  console.log("films search", films);
  return (
    <div >
      {films ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {films.map((film) => (
            <FilmCard key={film.imdbID} film={film} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div>
          <p>Film tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}
