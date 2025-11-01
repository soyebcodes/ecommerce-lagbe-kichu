import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Here you can manage users, products, and view reports.</p>
      </div>
    </ProtectedRoute>
  );
}
