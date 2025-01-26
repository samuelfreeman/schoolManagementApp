import { DataTableColumnHeader } from "@/components/ui/data-columns-header";
import ActionMenu from "@/pages/admin/components/actions/action-menu";
import { ColumnDef } from "@tanstack/react-table";

export const columns = ({
  handleDelete,
}: {
  handleDelete: (id: string) => void;
}): ColumnDef<TutorTable>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "registeredCode",
    header: "Registered Code",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tutor = row.original;

      return (
        <ActionMenu
          id={tutor.id}
          resourceName="tutor"
          onDelete={() => handleDelete(tutor.id)}
        />
      );
    },
  },
];
