import StoreForm from "../store-form";
import AdminShell from "../admin-shell";

export default function NovaLojaPage() {
  return (
    <AdminShell>
      <StoreForm mode="create" />
    </AdminShell>
  );
}
