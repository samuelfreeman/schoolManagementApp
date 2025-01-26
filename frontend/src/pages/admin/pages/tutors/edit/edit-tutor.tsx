import AdminHeader from "@/pages/admin/components/header/header";
import { useFetchTutor } from "@/pages/admin/services/tutors/queries";
import { useParams } from "react-router-dom";
import EditTutorForm from "./edit-tutor-form";

export default function EditTutor() {
  const id = useParams<{ id: string }>();
  const { data: tutor } = useFetchTutor(id.id ?? "");

  if (!tutor) return <div>Tutor not found</div>;

  return (
    <section>
      {/* Header */}
      <AdminHeader
        title="Edit Tutor"
        description="Edit tutor details"
        buttons={[{ title: "Back", link: "/admin/tutor" }]}
      />
      {/* Form */}
      <div>
        <EditTutorForm tutor={tutor} />
      </div>
    </section>
  );
}
