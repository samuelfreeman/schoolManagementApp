import AdminHeader from "@/pages/admin/components/header/header";
import AddTutorForm from "./add-tutor-form";

export default function AddTutor() {
  return (
    <section className="w-full max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <AdminHeader
        title="Add Tutor"
        description="Add a new tutor to your platform"
        buttons={[{ title: "Back", link: "/admin/tutors", type: "button" }]}
      />
      {/* Form */}
      <div>
        <AddTutorForm />
      </div>
    </section>
  );
}
