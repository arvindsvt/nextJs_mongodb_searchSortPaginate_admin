'use client';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductTable({ refreshKey }){
  const [products,setProducts]=useState([]);
  const [search,setSearch]=useState('');
  const [sortField,setSortField]=useState('created_at');
  const [sortOrder,setSortOrder]=useState('desc');
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const LIMIT=5;

  const fetchProducts = async ()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/products`, { params: { search, page, limit: LIMIT, sortField, sortOrder } });
    setProducts(res.data.products || []);
    setTotalPages(res.data.totalPages || 1);
  };

  useEffect(()=>{ fetchProducts(); }, [search,page,sortField,sortOrder, refreshKey ]);

  const handleDelete = async (id)=>{
    if(!confirm('Delete product?')) return;
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input value={search} onChange={e=>{ setPage(1); setSearch(e.target.value); }} placeholder="Search..." className="border rounded px-3 py-2 w-full max-w-sm"/>
        <div className="flex gap-2 items-center">
          <select value={sortField} onChange={e=>setSortField(e.target.value)} className="border rounded px-3 py-2">
            <option value="created_at">Created At</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <select value={sortOrder} onChange={e=>setSortOrder(e.target.value)} className="border rounded px-3 py-2">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p=>(
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.mobile}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{new Date(p.created_at).toLocaleString()}</td>
                <td className="p-3 space-x-2">
                  <Link href={`/products/${p._id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button onClick={()=>handleDelete(p._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button onClick={()=>setPage(p=>Math.max(p-1,1))} disabled={page===1} className={`px-4 py-2 rounded-lg ${page===1? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={()=>setPage(p=>Math.min(p+1,totalPages))} disabled={page===totalPages} className={`px-4 py-2 rounded-lg ${page===totalPages? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Next</button>
      </div>
    </div>
  );
}
