// frontend/pages/admin.js
// frontend/pages/admin.js
import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("../components/AdminPanel"), {
  ssr: false,
});

export default function AdminPage() {
  return <AdminPanel />;
}
