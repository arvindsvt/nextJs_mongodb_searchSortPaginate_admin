'use client';
import Link from 'next/link';

export default function Sidebar(){ return (
  <aside className="w-64 bg-gray-900 text-white h-screen fixed">
    <div className="p-4 text-xl font-bold border-b border-gray-700">Admin Panel</div>
    <nav className="flex flex-col p-4 space-y-2">
      <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
      <Link href="/products" className="hover:bg-gray-700 p-2 rounded">Products</Link>
    </nav>
  </aside>
)};
