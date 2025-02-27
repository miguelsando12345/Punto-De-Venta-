export const fetchInventario = async () => {
  const res = await fetch("/api/inventario");
  return res.json();
};

export const getProductoById = async (id: number) => {
  const res = await fetch(`/api/inventario/${id}`);
  return res.json();
};

export const createProducto = async (data: unknown) => {
  const res = await fetch("/api/inventario", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const updateProducto = async (id: number, data: unknown) => {
  const res = await fetch(`/api/inventario/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const deleteProducto = async (id: number) => {
  const res = await fetch(`/api/inventario/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
