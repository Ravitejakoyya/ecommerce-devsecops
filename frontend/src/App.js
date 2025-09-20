import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get(`${API}/products`).then(r => setProducts(r.data)).catch(() => setProducts([]));
  }, []);

  const add = async () => {
    if (!name || !price) return;
    await axios.post(`${API}/products`, { name, price: Number(price) });
    const r = await axios.get(`${API}/products`);
    setProducts(r.data);
    setName(''); setPrice('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>E-Commerce Frontend (Local)</h1>
      <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="price" value={price} onChange={e => setPrice(e.target.value)} style={{ marginLeft: 8 }} />
      <button onClick={add} style={{ marginLeft: 8 }}>Add</button>
      <ul>
        {products.map(p => <li key={p._id}>{p.name} — ${p.price}</li>)}
      </ul>
    </div>
  );
}
