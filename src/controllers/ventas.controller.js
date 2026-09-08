let ventas = [
  { id: 1, nombre: 'Laptop', precio: 1200 },
  { id: 2, nombre: 'televisor', precio: 5000 },
  { id: 3, nombre: 'ventilador', precio: 7000 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: ventas });
};

const getById = (req, res) => {
  const item = ventas.find(
    p => p.id == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  ventas.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

module.exports = { getAll, getById, create };