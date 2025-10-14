import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import type { FilmApi } from "../organisms/InputPanel";

interface FilmCardProps {
  film: FilmApi;
  onSelect: (film: FilmApi) => void;
}

export default function FilmCard({ film, onSelect }: FilmCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer bg-gray-50"
      onClick={() => onSelect(film)}
    >
      <CardHeader>
        <h3 className="font-semibold">{film.Title}</h3>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img
          src={film.Poster !== "N/A" ? film.Poster : "/no-poster.png"}
          alt={film.Title}
          className="w-40 h-56 object-cover rounded-md"
        />
      </CardContent>
    </Card>
  );
}
