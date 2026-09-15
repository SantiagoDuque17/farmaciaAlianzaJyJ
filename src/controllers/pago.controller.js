let pagos = [
  { id: 1, nombre: 'Laptop', precio: 1200 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: pagos });
};

const getById = (req, res) => {
  const item = pagos.find(
    p => p.id == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  pagos.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

module.exports = { getAll, getById, create };