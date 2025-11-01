import ProtectedRoute from "@/components/ProtectedRoute";

export default function BuyerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["buyer"]}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Buyer Dashboard</h1>
        <p>Here you can view your orders and track products.</p>
      </div>
    </ProtectedRoute>
  );
}
