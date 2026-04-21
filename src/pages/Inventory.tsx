import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { IProduct } from "../types/product";
import type { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import type { TCategory } from "../types/product";
import type { TOrigin } from "../types/product";
import { motion } from "motion/react";

const Inventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<IProduct, "id" | "createdAt">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    category: "Noodles",
    origin: "Korea",
    isSpicy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newId = await productService.addProduct({
        ...formData,
        createdAt: Date.now(),
      });
      console.log("add new product", newId);
      toast.success("The product has been successfully added!");
    } catch (err) {
      const error = err as FirebaseError;
      toast.error("Error: " + error.message);
    } finally {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        category: "Noodles",
        origin: "Korea",
        isSpicy: false,
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Oh, something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  if (loading) return <div>Product loading...</div>;

  return (
    <div>
      <div className="w-full inline-block rounded-lg p-2 bg-layersBackground">
        <h1 className="font-bold mb-2">Product List:</h1>
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
                  alt=""
                />
                <div>
                  <p>Name: {item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Stock: {item.stock}</p>
                  <p>Spicy: {item.isSpicy ? "spicy" : "not spicy"}</p>
                  <p>Category: {item.category}</p>
                  <p>Origin: {item.origin}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-5 bg-layersBackground p-3 rounded-lg"
      >
        <h2 className="font-bold">Add new product:</h2>
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold ">Name: </label>
              <input
                type="text"
                className="px-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold ">Price: </label>
              <input
                type="number"
                className="px-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>
          </div>
          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as TCategory,
                  })
                }
              >
                {["Noodles", "Snacks", "Drinks", "Sweets", "Sauces"].map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Origin</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    origin: e.target.value as TOrigin,
                  })
                }
              >
                {["Korea", "Japan", "China", "Thailand", "Taiwan"].map(
                  (origin) => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-sm font-semibold  mb-1">
                  Quantity in stock
                </label>
                <input
                  required
                  type="number"
                  className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.stock || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center space-x-2 pt-5">
                <input
                  type="checkbox"
                  id="spicy"
                  checked={formData.isSpicy}
                  onChange={(e) =>
                    setFormData({ ...formData, isSpicy: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="spicy"
                  className="text-sm font-medium  select-none"
                >
                  Is this a spicy product? 🌶️
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold  mb-1">
                Image URL
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://firebasestorage.googleapis.com/..."
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md"
            >
              {loading ? "We store it in Firebase..." : "Add item to inventory"}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Inventory;
