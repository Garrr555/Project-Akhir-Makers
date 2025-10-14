import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import HistoricalItem from "../molecules/HistoricalItem";

export default function HistoricalList() {
  const records = useSelector((state: RootState) => state.tickets.records);

  const totalTickets = records.reduce((acc, cur) => acc + cur.count, 0);
  const totalRevenue = records.reduce((acc, cur) => acc + cur.total, 0);

  console.log(records);

  return (
    <div>
      {totalTickets !== 0 ? (
        <div className="p-4">
          {records.map((r, i) => (
            <div key={i} className=" py-2">
              <HistoricalItem record={r} />
            </div>
          ))}
          <div>
            <h1 className="font-bold">Ringkasan Harian</h1>
            <p>Total Tiket Terjual: {totalTickets}</p>
            <p>Total Pendapatan: Rp. {totalRevenue.toLocaleString("id-ID")}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center">
          <p className="font-bold text-3xl">Tidak ada data</p>
        </div>
      )}
    </div>
  );
}
