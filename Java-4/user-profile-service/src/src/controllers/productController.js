let products = require("../data/products");

// GET /products
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// GET /products/:id
exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// POST /products
exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT /products/:id
exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = name ?? product.name;
  product.price = price ?? product.price;

  res.json(product);
};

// DELETE /products/:id
exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
};