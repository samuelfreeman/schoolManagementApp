import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function TutorsTable({
  data,
  handleDelete,
}: {
  data: TutorTable[];
  handleDelete: (id: string) => void;
}) {
  return (
    <div className="py-8">
      <DataTable columns={columns({ handleDelete })} data={data} />
    </div>
  );
}
