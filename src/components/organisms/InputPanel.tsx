import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrUpdateRecord } from "@/features/tickets/ticketsSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Clapperboard,
  Loader,
  Loader2,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import FilmList from "../molecules/FilmList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

export interface FilmApi {
  Poster: string;
  Title: string;
  Type: string;
  imdbID: string;
  Year: string;
}

export default function InputPanel() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState<FilmApi[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<FilmApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [ticketCount, setTicketCount] = useState(1);
  const [htm, setHtm] = useState(50000);
  const apikey = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=${apikey}`
      );
      const data = await res.json();
      setFilms(data.Search || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTicket = () => {
    if (!selectedFilm) return;
    const record = {
      title: selectedFilm.Title,
      date: format(selectedDate, "yyyy-MM-dd"),
      count: ticketCount,
      htm,
      total: ticketCount * htm,
    };
    dispatch(addOrUpdateRecord(record));

    toast.success("Tiket berhasil ditambahkan");
    setSelectedFilm(null); // reset
    setFilms([]); // reset hasil pencarian
    setSearch("");
  };

  const cancelFilm = () => {
    setSelectedFilm(null); // reset
    toast.success("Film diganti");
  };

  console.log("Film terpilih", selectedFilm);

  return (
    <div className="p-4 bg-white/70 h-[90vh] rounded-2xl shadow-lg space-y-4">
      {/* Input Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Cari judul film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading} className="w-1/12 bg-gradient-to-br from-green-500 via-green-400 to-green-200">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-10 h-10" />
          )}
        </Button>
      </div>

      {films.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center font-bold h-[80vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {loading ? (
            <div>
              <Loader className="mx-auto w-20 h-20 animate-spin" />
              <p className="text-xl">Tunggu ya</p>
            </div>
          ) : (
            <div>
              <Clapperboard className="w-20 h-20 mx-auto" />
              <p className="text-xl">Silahkan Cari Film</p>
            </div>
          )}
        </div>
      )}

      {/* Hasil Pencarian */}
      {!selectedFilm && films.length > 0 && (
        <div className="h-[80vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-auto">
          <FilmList films={films} onSelect={setSelectedFilm} />
        </div>
      )}

      {/* Form Input Tiket */}
      {selectedFilm && (
        <div className=" border-t pt-4 flex flex-col gap-1 justify-between">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="font-bold text-xl">{selectedFilm.Title} ({selectedFilm.Type} - {selectedFilm.Year})</h2>
            <img
              src={
                selectedFilm.Poster !== "N/A"
                  ? selectedFilm.Poster
                  : "/no-poster.png"
              }
              alt={selectedFilm.Title}
              className="w-60 h-76 object-cover rounded-md border-2 shadow-xl"
            />
          </div>

          {/* Jumlah Tiket */}
          <div className="flex items-center gap-3">
            <label className="w-24">Jumlah</label>
            <Input
              type="text"
              min={1}
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
              className="w-32 bg-white"
            />
          </div>

          {/* Tanggal Menonton */}
          <div className="flex items-center gap-3">
            <label className="w-24">Tanggal</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-[200px]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* HTM */}
          <div className="flex items-center gap-3">
            <label className="w-24">HTM</label>
            <Select
              value={String(htm)}
              onValueChange={(val) => setHtm(Number(val))}
            >
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Pilih harga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30000">Rp 30.000 (Senin - Kamis)</SelectItem>
                <SelectItem value="50000">Rp 50.000 (Jumat - Sabtu)</SelectItem>
                <SelectItem value="40000">Rp 40.000 (Minggu)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={cancelFilm} className="bg-gradient-to-tr from-blue-300 to-blue-500 text-white">
              Ganti Film
            </Button>
            <Button onClick={handleAddTicket} className="bg-gradient-to-tr from-green-300 to-green-500">Tambah Tiket</Button>
          </div>
        </div>
      )}
    </div>
  );
}
