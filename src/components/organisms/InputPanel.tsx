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
import { CalendarIcon, Loader2 } from "lucide-react";
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

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=d592fe1a`
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

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg space-y-4">
      {/* Input Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Cari judul film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cari"}
        </Button>
      </div>

      {/* Hasil Pencarian */}
      {!selectedFilm && films.length > 0 && (
        <FilmList films={films} onSelect={setSelectedFilm} />
      )}

      {/* Form Input Tiket */}
      {selectedFilm && (
        <div className="space-y-4 border-t pt-4">
          <h2 className="font-semibold text-lg">{selectedFilm.Title}</h2>

          {/* Jumlah Tiket */}
          <div className="flex items-center gap-3">
            <label className="w-24">Jumlah</label>
            <Input
              type="number"
              min={1}
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
              className="w-32"
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
              <SelectTrigger className="w-[200px]">
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
            <Button variant="outline" onClick={cancelFilm}>
              Ganti Film
            </Button>
            <Button onClick={handleAddTicket}>Tambah Tiket</Button>
          </div>
        </div>
      )}
    </div>
  );
}
