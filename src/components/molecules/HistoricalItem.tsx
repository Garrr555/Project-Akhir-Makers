import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeRecord } from "@/features/tickets/ticketsSlice";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";

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
    toast.success(`Tiket ${record.title} berhasil dihapus`);
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
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{formattedDate}</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-tl from-red-300 to-red-600">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Tiket?</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah kamu yakin ingin menghapus tiket{" "}
                  <span className="font-semibold">{record.title}</span>?
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Konfirmasi
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
          <p className="font-medium">Judul Film</p>
          <p>: {record.title}</p>
          <p className="font-medium">Jml</p>
          <p>: {record.count}</p>
          <p className="font-medium">HTM</p>
          <p>: Rp. {record.htm.toLocaleString("id-ID")}</p>
          <p className="font-medium">Total</p>
          <p>: Rp. {record.total.toLocaleString("id-ID")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
