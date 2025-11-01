import ProtectedRoute from "@/components/ProtectedRoute";

export default function SellerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["seller"]}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>
        <p>Here you can manage your products and orders.</p>
      </div>
    </ProtectedRoute>
  );
}
