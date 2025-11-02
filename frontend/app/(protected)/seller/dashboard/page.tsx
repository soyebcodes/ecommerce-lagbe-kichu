"use client";

import Link from "next/link";

export default function SellerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <nav className="flex gap-4">
        <Link href="/seller/dashboard/products" className="text-blue-600">
          My Products
        </Link>
        <Link href="/seller/dashboard/products/add" className="text-blue-600">
          Add Product
        </Link>
      </nav>
    </div>
  );
}
