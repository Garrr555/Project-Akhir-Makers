import { useState, useEffect } from "react";
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
  Pencil,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import FilmCard from "../molecules/FilmCard";

export interface FilmApi {
  Poster: string;
  Title: string;
  Type: string;
  imdbID: string;
  Year: string;
}

export default function InputPanel() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>("");
  const [films, setFilms] = useState<FilmApi[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<FilmApi | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [ticketCount, setTicketCount] = useState<number>(1);

  const [hargaSeninKamis, setHargaSeninKamis] = useState<number>(30000);
  const [hargaJumatSabtu, setHargaJumatSabtu] = useState<number>(50000);
  const [hargaMinggu, setHargaMinggu] = useState<number>(40000);

  const [editing, setEditing] = useState<boolean>(false);
  const [htm, setHtm] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const apikey = import.meta.env.VITE_API_KEY;

  console.log("films dicari", films);
  console.log("selectedFilm", selectedFilm);

  // minggu = 0, sabtu = 6
  useEffect(() => {
    const day = selectedDate.getDay();

    console.log("day: ", day);
    console.log("selectedDate: ", selectedDate);
    console.log("hargaSeninKamis: ", hargaSeninKamis);
    console.log("hargaJumatSabtu: ", hargaJumatSabtu);
    console.log("hargaMinggu: ", hargaMinggu);

    if (day === 0) {
      setHtm(hargaMinggu);
    } else if (day === 5 || day === 6) {
      setHtm(hargaJumatSabtu);
    } else {
      setHtm(hargaSeninKamis);
    }
  }, [selectedDate, hargaSeninKamis, hargaJumatSabtu, hargaMinggu]);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setHasSearched(true);

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
      htm: htm,
      total: ticketCount * htm,
    };

    dispatch(addOrUpdateRecord(record));
    toast.success("Tiket berhasil ditambahkan");

    setSelectedFilm(null);
    setFilms([]);
    setSearch("");
  };

  const cancelFilm = () => {
    setSelectedFilm(null);
    toast.success("Film diganti");
  };

  return (
    <div className="p-4 bg-white/70 border-2 border-slate-200 rounded-2xl shadow-lg space-y-4 max-h-[90vh]">
      {/* Input Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Cari judul film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          size={"lg"}
          onClick={handleSearch}
          disabled={loading}
          className="w-1/12 bg-gradient-to-br from-green-500 via-green-400 to-green-200"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-10 h-10" />
          )}
        </Button>
      </div>

      {/* Hasil Pencarian */}
      {!selectedFilm && (
        <div className="flex flex-col gap-2 items-center justify-center font-bold h-[80vh] overflow-auto">
          {loading ? (
            <>
              <Loader className="mx-auto w-20 h-20 animate-spin" />
              <p className="text-xl">Tunggu ya...</p>
            </>
          ) : hasSearched ? (
            films.length > 0 ? (
              <div className="w-full h-full overflow-auto grid grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                {films.map((film) => (
                  <FilmCard
                    key={film.imdbID}
                    film={film}
                    setSelectedFilm={setSelectedFilm}
                  />
                ))}
              </div>
            ) : (
              <>
                <Clapperboard className="w-20 h-20 mx-auto text-gray-400" />
                <p className="text-xl text-gray-600">Film tidak ditemukan 😢</p>
              </>
            )
          ) : (
            <>
              <Clapperboard className="w-20 h-20 mx-auto text-gray-400" />
              <p className="text-xl text-gray-600">Cari Film Yuk 🎬</p>
            </>
          )}
        </div>
      )}

      {/* Form Input Tiket */}
      {selectedFilm && (
        <div className="border-t pt-4 flex flex-col gap-2 max-h-[80vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-auto">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="font-bold text-xl">
              {selectedFilm.Title} ({selectedFilm.Type} - {selectedFilm.Year})
            </h2>
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

          {/* HTM (otomatis) */}
          <div className="flex items-center gap-3">
            <label className="w-24">HTM</label>
            <Input
              value={`Rp. ${htm.toLocaleString()}`}
              readOnly
              className="w-[200px] bg-gray-100"
            />
          </div>

          {/* Tabel Edit HTM */}
          <div className="border rounded-xl p-3 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Tabel Harga Tiket</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(!editing)}
                className="flex gap-2"
              >
                {editing ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Pencil className="w-4 h-4" />
                )}
                {editing ? "Selesai" : "Edit"}
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Senin - Kamis:</span>
                {editing ? (
                  <Input
                    type="number"
                    value={hargaSeninKamis}
                    onChange={(e) => setHargaSeninKamis(Number(e.target.value))}
                    className="w-32"
                  />
                ) : (
                  <span className="font-semibold">
                    Rp {hargaSeninKamis.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Jumat - Sabtu:</span>
                {editing ? (
                  <Input
                    type="number"
                    value={hargaJumatSabtu}
                    onChange={(e) => setHargaJumatSabtu(Number(e.target.value))}
                    className="w-32"
                  />
                ) : (
                  <span className="font-semibold">
                    Rp {hargaJumatSabtu.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Minggu:</span>
                {editing ? (
                  <Input
                    type="number"
                    value={hargaMinggu}
                    onChange={(e) => setHargaMinggu(Number(e.target.value))}
                    className="w-32"
                  />
                ) : (
                  <span className="font-semibold">
                    Rp {hargaMinggu.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <Button
              variant="outline"
              onClick={cancelFilm}
              className="bg-gradient-to-tr from-blue-300 to-blue-500 text-white"
            >
              Ganti Film
            </Button>
            <Button
              onClick={handleAddTicket}
              className="bg-gradient-to-tr from-green-300 to-green-500"
            >
              Tambah Tiket
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
