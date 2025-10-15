import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import HistoricalItem from "../molecules/HistoricalItem";

export default function HistoricalList() {
  const records = useSelector((state: RootState) => state.tickets.records);

  const totalTickets = records.reduce((acc, cur) => acc + cur.count, 0);
  const totalRevenue = records.reduce((acc, cur) => acc + cur.total, 0);

  console.log(records);

  return (
    <div className="h-full overflow-hidden">
      {totalTickets !== 0 ? (
        <div className="h-full flex flex-col justify-between gap-2">
          <div className="h-5/6 border bg-white/70 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-xl">
            {records.map((r, i) => (
              <div key={i} className=" p-2 ">
                <HistoricalItem record={r} />
              </div>
            ))}
          </div>
          <div className=" bg-white p-2 border rounded-lg shadow-md">
            <h1 className="font-bold">Ringkasan Harian</h1>
            <p>Total Tiket Terjual: {totalTickets}</p>
            <p>Total Pendapatan: Rp. {totalRevenue.toLocaleString("id-ID")}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center justify-center h-full bg-white/70 rounded-xl">
          <p className="font-bold text-3xl">Tidak ada Tiket</p>
        </div>
      )}
    </div>
  );
}
