'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditPage(){
  const router = useRouter();
  const { id } = useParams();
  const [form,setForm]=useState({ name:'', mobile:'', email:'' });

  useEffect(()=>{ if(!id) return; axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`).then(r=>setForm(r.data)); },[id]);

  const save = async (e)=>{ e.preventDefault(); await axios.put(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`, form); router.push('/products'); };
  const remove = async ()=>{ if(!confirm('Delete?')) return; await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`); router.push('/products'); };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
      <form onSubmit={save} className="space-y-3 bg-white p-4 shadow rounded-lg">
        <input className="w-full p-2 border rounded" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="w-full p-2 border rounded" value={form.mobile||''} onChange={e=>setForm({...form,mobile:e.target.value})} />
        <input className="w-full p-2 border rounded" value={form.email||''} onChange={e=>setForm({...form,email:e.target.value})} />
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" type="submit">Update</button>
          <button onClick={remove} type="button" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
        </div>
      </form>
    </div>
  );
}
