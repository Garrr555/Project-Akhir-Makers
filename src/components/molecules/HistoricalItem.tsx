import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeRecord } from "@/features/tickets/ticketsSlice";
import { toast } from "sonner";

interface TicketRecord {
  title: string;
  date: string;
  count: number;
  htm: number;
  total: number;
}

export default function HistoricalItem({ record }: { record: TicketRecord }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeRecord({ title: record.title, date: record.date }));
    toast.success("Tiket berhasil dihapus");
  };

  console.log("record", record);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(record.date));

  return (
    <Card className=" hover:shadow-lg transition-all">
      <CardHeader>
        <h3 className="text-lg font-medium">{formattedDate}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5 justify-between items-center">
          <p>Judul Film : {record.title}</p>
          <p>Jml: {record.count}</p>
          <p>Total: Rp.{record.total.toLocaleString("id-ID")}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
}
