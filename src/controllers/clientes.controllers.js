let clientes = [
  { id: 1, nombre: 'Samuel Londoño', email: "samu@gmai.com" }
  { id: 2, nombre: 'Valentina Andrade', email: "vale@gmai.com" }
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
