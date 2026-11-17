const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] })); // CORS: antes de las rutas
app.use(express.json());

let products = [{ id: 1, name: 'Teclado', description: 'Switch verde', price: 189900, stock: 15 }];
let sig = 2;

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id == req.params.id);
  p ? res.json(p) : res.sendStatus(404);
});

app.post('/api/products', (req, res) => {
  const p = { id: sig++, ...req.body };
  products.push(p);
  res.status(201).json(p);
});

app.put('/api/products/:id', (req, res) => {
  const i = products.findIndex(x => x.id == req.params.id);
  if (i < 0) return res.sendStatus(404);
  products[i] = { ...products[i], ...req.body };
  res.json(products[i]);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(x => x.id != req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log('API en http://localhost:3000'));