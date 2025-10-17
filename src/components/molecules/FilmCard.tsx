import { Card } from "@/components/ui/card";
import type { FilmApi } from "../organisms/InputPanel";

interface FilmCardProps {
  film: FilmApi;
  setSelectedFilm: (film: FilmApi) => void;
}

export default function FilmCard({ film, setSelectedFilm }: FilmCardProps) {
  return (
    <Card
      className="flex flex-col justify-between gap-2 p-2 hover:shadow-lg transition-all cursor-pointer bg-gray-50 hover:transform hover:scale-105 duration-300 ease-in-out"
      onClick={() => setSelectedFilm(film)}
    >
      <div className="max-h-1/6">
        <h3 className="font-semibold">
          {film.Title} ({film.Type} - {film.Year})
        </h3>
      </div>
      <div className="flex justify-center items-center max-h-5/6">
        <img
          src={film.Poster !== "N/A" ? film.Poster : `/video.jpg`}
          alt={film.Title}
          className="w-60 h-76 object-cover rounded-md"
        />
      </div>
    </Card>
  );
}
