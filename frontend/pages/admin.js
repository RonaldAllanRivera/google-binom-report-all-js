// frontend/pages/admin.js
import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("../components/AdminPanel"), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <>
      <h2 className="text-center my-8 text-purple-700 text-2xl font-bold">
        Google Ads + Binom Report Admin Panel (MVP)
      </h2>
      <AdminPanel />
    </>
  );
}