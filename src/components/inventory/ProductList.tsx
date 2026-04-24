import { useEffect } from "react";
import { useInventoryStore } from "../../store/useInventoryStore";

function ProductList() {
  const fetchProducts = useInventoryStore((state) => state.fetchProducts);
  const products = useInventoryStore((state) => state.products);
  const loading = useInventoryStore((state) => state.isLoading);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="animate-pulse text-lg font-medium">
          Loading inventory...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full inline-block rounded-lg p-2 pt-0 bg-layersBackground">
        {products.length === 0 ? (
          <p>The warehouse is currently empty.</p>
        ) : (
          <ul className="grid grid-cols-3 gap-3">
            {products.map((item) => (
              <li
                key={item.id}
                className="flex border-2 p-1 rounded-lg border-border gap-1"
              >
                <img
                  className="max-w-40 rounded-lg"
                  src={item.imageUrl}
                  alt="Product photo"
                />
                <div>
                  <p>
                    <span className="font-semibold">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="font-semibold">Price: </span>${item.price}
                  </p>
                  <p>
                    <span className="font-semibold">Stock: </span>
                    {item.stock}
                  </p>
                  <p>
                    <span className="font-semibold">Spicy: </span>
                    {item.isSpicy ? "spicy" : "not spicy"}
                  </p>
                  <p>
                    <span className="font-semibold">Category: </span>
                    {item.category}
                  </p>
                  <p>
                    <span className="font-semibold">Origin: </span>
                    {item.origin}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductList;
