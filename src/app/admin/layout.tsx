import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Admin Navigation */}
      <nav className="bg-[#111] border-b border-[rgba(255,255,255,0.3)]">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-[#4BAE79] font-bold text-xl hover:text-[#5EA239] transition-colors"
              >
                ← Portfolio
              </Link>
              <Link
                href="/admin"
                className="text-white hover:text-[#4BAE79] transition-colors"
              >
                Pending Reviews
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-[#a9a9a9] text-sm">Admin Dashboard</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
