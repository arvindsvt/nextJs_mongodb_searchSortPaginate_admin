'use client';
import { useState } from 'react';
import ProductTable from '../components/ProductTable';
import AddProductModal from '../components/AddProductModal';

export default function ProductsPage(){
  const [showModal,setShowModal]=useState(false);
  const [refreshKey,setRefreshKey]=useState(0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={()=>setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">➕ Add Product</button>
      </div>

      <ProductTable refreshKey={refreshKey} />

      {showModal && <AddProductModal onClose={()=>setShowModal(false)} onSuccess={()=>{ setShowModal(false); setRefreshKey(k=>k+1); }} />}
    </div>
  );
}
