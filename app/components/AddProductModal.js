'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AddProductModal({ onClose, onSuccess }){
  const [form, setForm] = useState({ name:'', email:'', mobile:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/products`, form);
      onSuccess && onSuccess();
    } catch (err) {
      alert('Error: '+(err.response?.data?.error||err.message));
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border p-2 rounded" />
          <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border p-2 rounded" />
          <input required placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} className="w-full border p-2 rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">{loading? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
