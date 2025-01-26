import AdminHeader from "../../components/header/header";
import { TableError } from "../../components/loaders/table-error";
import { TableSkeleton } from "../../components/loaders/table-loader";
import { useAdminDeleteResource } from "../../services/delete/delete.service";
import { useFetchAllTutors } from "../../services/tutors/queries";
import TutorsTable from "./list/table";

export default function Tutors() {
  // Fetch all tutors
  const { data: tutors, isLoading, error, isError } = useFetchAllTutors();
  // Delete tutor
  const { mutateAsync: deleteTutor } = useAdminDeleteResource(
    "tutors",
    "tutors"
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteTutor(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      {/* Header */}
      <AdminHeader
        title="Tutors"
        description="Manage tutors on the platform"
        buttons={[{ title: "Create Tutor", link: "/admin/tutors/add" }]}
      />
      {/* Data table */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError error={error as unknown as Errors} />
      ) : (
        <TutorsTable data={tutors} handleDelete={handleDelete} />
      )}
    </section>
  );
}
