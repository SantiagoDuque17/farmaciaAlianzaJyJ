let clientes = [
  { id: 1, nombre: 'Laptop', precio: 1200 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: clientes });
};

const getById = (req, res) => {
  const item = clientes.find(
    p => p.id == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  clientes.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

module.exports = { getAll, getById, create };